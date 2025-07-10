import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'calendar' | 'text';
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'card', 
  count = 1, 
  className = '' 
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-gray-700 rounded-xl p-6 animate-pulse ${className}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-600 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-600 rounded"></div>
              <div className="h-3 bg-gray-600 rounded w-5/6"></div>
              <div className="h-2 bg-gray-600 rounded-full w-full"></div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              </div>
              <div className="h-3 bg-gray-600 rounded w-20"></div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`bg-gray-700 rounded-lg p-4 animate-pulse ${className}`}>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-600 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              </div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className={`bg-gray-800 rounded-xl p-6 animate-pulse ${className}`}>
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 bg-gray-600 rounded w-32"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-6 bg-gray-600 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-600 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;