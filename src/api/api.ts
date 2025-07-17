// src/api/api.ts
import axios from 'axios';

// Use a constant for your backend base URL to avoid mismatch
const BASE_URL = 'https://welcomed-terribly-adder.ngrok-free.app/api'; // <- Change if needed

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const oldRefreshToken = localStorage.getItem('refresh_token');

        if (oldRefreshToken) {
          // Refresh both access and refresh tokens
          const refreshResponse = await axios.post(`${BASE_URL}/users/token/refresh/`, {
            refresh: oldRefreshToken,
          });

          const newAccess = refreshResponse.data.access;
          const newRefresh = refreshResponse.data.refresh;

          localStorage.setItem('access_token', newAccess);
          localStorage.setItem('refresh_token', newRefresh);

          // Retry the original request with new access token
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails (blacklisted or expired), log out
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
