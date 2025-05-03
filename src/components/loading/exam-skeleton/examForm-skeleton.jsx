import React from 'react';

const CategoryFormSkeleton = () => {
    return (
        <div>
             <div className="space-y-4 bg-lightCard dark:bg-darkCard">
            {/* Skeleton for Category Select */}
            <div className="skeleton skeleton-select w-full h-12 bg-gray-300 dark:bg-black animate-pulse"></div>

            {/* Skeleton for Exam Name */}
            <div className="skeleton skeleton-input w-full h-12 bg-gray-300 dark:bg-black animate-pulse"></div>

            {/* Skeleton for Total Marks, Total Questions, and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="skeleton skeleton-input w-full h-12 bg-gray-300 dark:bg-black animate-pulse"></div>
              <div className="skeleton skeleton-input w-full h-12 bg-gray-300 dark:bg-black animate-pulse"></div>
              <div className="skeleton skeleton-input w-full h-12 bg-gray-300 dark:bg-black animate-pulse"></div>
            </div>

            {/* Skeleton for Image Upload */}
            <div className="skeleton skeleton-input w-full h-12 bg-gray-300 dark:bg-black animate-pulse"></div>

            {/* Skeleton for Status Checkbox */}
            <div className="skeleton skeleton-checkbox w-full h-12 bg-gray-300 dark:bg-black animate-pulse"></div>

            {/* Skeleton for Submit Button */}
            <div className="skeleton skeleton-button w-full h-12 bg-gray-300 dark:bg-black animate-pulse"></div>
          </div>
        </div>
    );
};

export default CategoryFormSkeleton;