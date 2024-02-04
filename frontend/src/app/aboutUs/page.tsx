import React from 'react';

const aboutUs = () => {
  return (
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 justify-center items-center m-14">
      {/* Card 1 */}
      <div className="w-128 h-48 border border-borderN shadow-lg rounded-lg overflow-hidden flex lg:flex-row md:flex-row sm:flex-row ">
        {/* Image Entry (1/4th) */}
        <div className="w-48 h-48  bg-gray-400"></div>

        {/* Data Entry (3/4th) */}
        <div className="p-4 w-80 h-48 ">
          <h3 className="text-title font-semibold ">Name 1</h3>
          <p className="text-para">Description 1.</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-128 h-48 border border-borderN shadow-lg rounded-lg overflow-hidden flex lg:flex-row md:flex-row sm:flex-row ">
        {/* Image Entry (1/4th) */}
        <div className="w-48 h-48  bg-gray-400"></div>

        {/* Data Entry (3/4th) */}
        <div className="p-4 w-80 h-48 ">
          <h3 className="text-title font-semibold ">Name 2</h3>
          <p className="text-para">Description 2.</p>
        </div>
      </div>

      {/* Repeat similar structure for Card 3 to Card 5 */}
      {/* Card 3 */}
      <div className="w-128 h-48 border border-borderN shadow-lg rounded-lg overflow-hidden flex lg:flex-row md:flex-row sm:flex-row ">
        {/* Image Entry (1/4th) */}
        <div className="w-48 h-48  bg-gray-400"></div>

        {/* Data Entry (3/4th) */}
        <div className="p-4 w-80 h-48 ">
          <h3 className="text-title font-semibold ">Name 3</h3>
          <p className="text-para">Description 3.</p>
        </div>
      </div>
      {/* ... */}

      {/* Card 4 */}
      <div className="w-128 h-48 border border-borderN shadow-lg rounded-lg overflow-hidden flex lg:flex-row md:flex-row sm:flex-row ">
        {/* Image Entry (1/4th) */}
        <div className="w-48 h-48  bg-gray-400"></div>

        {/* Data Entry (3/4th) */}
        <div className="p-4 w-80 h-48 ">
          <h3 className="text-title font-semibold ">Name 4</h3>
          <p className="text-para">Description 4.</p>
        </div>
      </div>
      {/* ... */}
    </div>
  );
};

export default aboutUs;
