const UserProfileSkeleton = () => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6 animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-gray-200 rounded mb-6"></div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Email */}
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Role */}
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Status */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-11 w-full bg-gray-300 rounded mt-6"></div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
