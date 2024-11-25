import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10  border-solid rounded-full animate-spin bg-gradient-to-r from-pink-500 to-purple-600"></div>
    </div>
  );
};

export default LoadingSpinner;
