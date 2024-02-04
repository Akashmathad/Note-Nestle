import React, { useState, useEffect, useRef } from 'react';

const Statastic = ({ data }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  const componentRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    observer.observe(componentRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      let interval;

      const startInterval = () => {
        interval = setInterval(() => {
          setCurrentCount((prevCount) => {
            const remainingCount = data.count - prevCount;
            let increment;

            if (remainingCount > 5) {
              increment = Math.ceil((remainingCount / 100) * 4); // Faster initially
            } else {
              increment = Math.ceil((remainingCount / 100) * 1); // Slower towards the end
            }

            const nextCount = prevCount + increment;

            if (nextCount >= data.count) {
              clearInterval(interval);
              setCurrentCount(data.count);
            } else {
              return nextCount;
            }
          });
        }, 100); // Initial faster interval
      };

      startInterval();

      return () => clearInterval(interval);
    }
  }, [isIntersecting, data.count]);

  return (
    <div
      ref={componentRef}
      className="grid grid-cols-2 py-[1rem] lg:py-[2rem] border-borderN border-[1px] w-[80%]  mx-auto rounded-[1rem]"
    >
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
