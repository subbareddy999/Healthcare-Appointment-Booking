import React from 'react';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-300"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
        <div className="h-10 bg-gray-300 rounded-full w-32 mx-auto"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
