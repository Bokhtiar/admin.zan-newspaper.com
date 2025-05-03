import React from "react";

const PageHeaderSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full animate-pulse bg-lightCard dark:bg-darkCard mt-4">
        {/* Skeleton for the left part (Title and Description) */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6  bg-gray-200 dark:bg-black rounded-full"></div>{" "}
            {/* Icon skeleton */}
            <div className="w-32 h-6 bg-gray-200 dark:bg-black rounded-md"></div>{" "}
            {/* Title skeleton */}
          </div>
          <div className="w-48 h-4 bg-gray-200 dark:bg-black rounded-md"></div>{" "}
          {/* Description skeleton */}
        </div>
        {/* Skeleton for the Button */}
        <div className="h-10 w-40 bg-gray-200 dark:bg-black rounded-full"></div>{" "}
        {/* Button skeleton */}
      </div>
    </div>
  );
};

export default PageHeaderSkeleton;
