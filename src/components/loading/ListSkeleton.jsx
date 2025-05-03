import React from 'react';

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(5)].map((_, i) => (
      <td key={i} className="px-4 py-2">
        <div className="h-4 bg-gray-300 dark:bg-black rounded w-full"></div>
      </td>
    ))}
  </tr>
);

const ListSkeleton = () => {
  return (
    <div className="p-6">
      <div className="bg-lightCard dark:bg-darkCard shadow-md rounded-md p-4">
        <div className="mb-4 flex justify-between items-center">
          <div className="h-6 bg-gray-300 dark:bg-black rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-black rounded w-1/3"></div>
        </div>

        <table className="w-full table-auto border-collapse">

          <tbody>
            {[...Array(10)].map((_, idx) => (
              <SkeletonRow key={idx} />
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div className="h-10 bg-gray-200 dark:bg-black w-24 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-black w-72 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ListSkeleton;
