import React from 'react';

const aboutUs = () => {
  return (
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 justify-center items-center m-4">
      {/* Card 1 */}
      <div className="w-128 h-48 border border-[#46464C] shadow-lg rounded-lg overflow-hidden flex lg:flex-row md:flex-row sm:flex-row ">
        {/* Image Entry (1/4th) */}
        <div className="w-48 h-48  bg-gray-400"></div>

        {/* Data Entry (3/4th) */}
        <div className="p-4 w-80 h-48 ">
          <h3 className="text-lg font-semibold text-white-200">Entry 1</h3>
          <p className="text-white-600">Description for Entry 1 goes here.</p>
        </div>
      </div>

      {/* Card 1 */}
      <div className="w-128 h-48 bg-white shadow-lg rounded-lg overflow-hidden flex lg:flex-row md:flex-row sm:flex-row">
        {/* Image Entry (1/4th) */}
        <div className="w-48 h-48 bg-gray-400"></div>

        {/* Data Entry (3/4th) */}
        <div className="p-4 w-80 h-48">
          <h3 className="text-lg font-semibold text-gray-800">Entry 1</h3>
          <p className="text-gray-600">Description for Entry 1 goes here.</p>
        </div>
      </div>

      {/* Repeat similar structure for Card 3 to Card 5 */}
      {/* Card 3 */}
      {/* ... */}

      {/* Card 4 */}
      {/* ... */}

      {/* Card 5 */}
      {/* ... */}
    </div>
  );
};

export default aboutUs;
