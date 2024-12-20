import React from 'react';

const RadarPulse = () => {
  return (
    <div className="relative">
      <div className="w-4 h-4">
        <div className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
        <div className="absolute w-3 h-3 bg-red-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default RadarPulse;