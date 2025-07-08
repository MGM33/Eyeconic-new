// GotchaOverlay.tsx
import React, { useEffect, useState } from 'react';

const GotchaOverlay: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Optional: auto-hide after X seconds (remove if you want it permanent)
    // setTimeout(() => setShow(false), 10000);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center text-white text-6xl font-bold select-none">
      Gotcha <span className="ml-4">😉</span>
    </div>
  );
};

export default GotchaOverlay;
