import LoadingSpinner from '@/components/LoadingSpinner';
import React from 'react';

const loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-[90vh]">
      <LoadingSpinner />
    </div>
  );
};

export default loading;
