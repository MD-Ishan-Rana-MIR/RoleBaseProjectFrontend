import React from "react";

const ProjectCardSkeleton: React.FC = () => {
  return (
    
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {Array.from({ length: 20 }).map((_, idx) => (
    <div key={idx} className="bg-white shadow-md rounded-lg p-4  animate-pulse">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

      {/* Description */}
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>

      {/* Footer: User + Date */}
      <div className="flex justify-between mt-3">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  ))}
</div>

  );
};

export default ProjectCardSkeleton;
