import React, { useState } from 'react';

const GotchaOverlay: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center text-white text-6xl font-extrabold cursor-pointer transition-opacity duration-500"
      onClick={() => setVisible(false)}
    >
      Gotcha <span className="ml-4">😉</span>
    </div>
  );
};

export default GotchaOverlay;
