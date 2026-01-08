const ScholarshipCardSkeleton = () => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-md mx-100 px-4 py-8 flex flex-col sm:flex-row gap-4 mb-5 animate-pulse">

      {/* LEFT IMAGE SKELETON */}
      <div className="w-full sm:w-45 h-48 sm:h-full bg-gray-300 rounded-lg"></div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-grow gap-3">

        {/* META ROW */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 w-3/4">
            <div className="w-16 h-3 bg-gray-300 rounded"></div>
            <div className="w-16 h-3 bg-gray-300 rounded"></div>
            <div className="w-16 h-3 bg-gray-300 rounded"></div>
            <div className="w-16 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="w-14 h-3 bg-gray-300 rounded"></div>
        </div>

        {/* TITLE */}
        <div className="w-2/3 h-4 bg-gray-300 rounded"></div>

        {/* DESCRIPTION */}
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>

        {/* BOTTOM ARROW */}
        <div className="flex justify-end mt-auto">
          <div className="w-8 h-8 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCardSkeleton;
