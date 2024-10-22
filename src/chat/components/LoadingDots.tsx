import React from 'react';

const LoadingDots: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
      <div className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
      <div className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400"></div>
    </div>
  );
};

export default LoadingDots;
