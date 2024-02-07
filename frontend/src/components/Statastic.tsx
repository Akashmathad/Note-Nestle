import React, { useState, useEffect } from 'react';

const Statastic = ({ data }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const finalNumber = data.count;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentCount < finalNumber) {
        setCurrentCount((prev) => prev + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 40);

    return () => clearInterval(intervalId);
  }, [currentCount, finalNumber]);

  return (
    <div className="grid grid-cols-2 py-[1rem] lg:py-[2rem] border-borderN border-[1px] w-[80%]  mx-auto rounded-[1rem]">
      {' '}
      <div className="flex flex-col text-center justify-center items-center border-borderN border-r-[1px]">
        <h2 className="font-fontPrimary text-[1.2rem] lg:text-[1.5rem] pb-[1rem] ">
          {data.category}
        </h2>
        <div className="">{data.icon}</div>
      </div>
      <h2 className="text-[4rem] lg:text-[5rem] font-extrabold">
        {currentCount}
      </h2>
    </div>
  );
};

export default Statastic;
