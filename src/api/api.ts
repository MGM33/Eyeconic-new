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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(
            '/users/token/refresh/',
            { refresh: refreshToken }
          );

          const newAccess = response.data.access;
          const newRefresh = response.data.refresh;

          // Save new tokens (IMPORTANT)
          localStorage.setItem('access_token', newAccess);
          if (newRefresh) {
            localStorage.setItem('refresh_token', newRefresh);
          }

          // Retry original request with new access token
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  }
);


export default api;
