import React from 'react';
import { Github } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { Linkedin } from 'lucide-react';

const aboutUs = () => {
  return (
    <div className="container flex flex-col items-center m-[1.8rem] ">
      {/* First Row */}
      <div className="flex items-center mt-[1.6rem] lg:mt-[3.2rem]">
        {/* Card 1 */}
        <div className="w-50 h-[8rem] lg:w-90 lg:h-[10rem] border border-borderN shadow-lg  overflow-hidden flex lg:flex-row md:flex-row sm:flex-row rounded-r-full rounded-l-full ">
          {/* Image Entry (1/4th) */}
          <div className="w-[8rem] h-[8rem] lg:w-[10rem] lg:h-[10rem] bg-gray-400 rounded-full"></div>

          {/* Data Entry (3/4th) */}
          <div className="p-[0.5rem] w-[12rem] h-[8rem] lg:p-[1rem] lg:w-[20rem] lg:h-[10rem] ">
            <h3 className="text-title font-semibold lg:text-[18px] text-[12px]">
              Name 1
            </h3>
            <p className="text-para lg:text-[14px] text-[8px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              fugiat officia qui dolorum suscipit id itaque dolor
            </p>
            <p className="flex flex-row gap-4 mt-[3px] lg:mt-[5px]">
              <a href="#">
                <Github size={20} />
              </a>
              <a href="#">
                <Twitter size={20} />
              </a>
              <a href="#">
                <Linkedin size={20} />
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex gap-8 flex-col lg:flex-row justify-center items-center  p-[0.6rem] lg:mt-[3rem] mt-[1.5rem]">
        {/* Card 2 */}
        <div className="w-50 h-[8rem] lg:w-90 lg:h-[10rem] border border-borderN shadow-lg  overflow-hidden flex lg:flex-row md:flex-row sm:flex-row rounded-r-full rounded-l-full ">
          {/* Image Entry (1/4th) */}
          <div className="w-[8rem] h-[8rem] lg:w-[10rem] lg:h-[10rem]  bg-gray-400 rounded-full"></div>

          {/* Data Entry (3/4th) */}
          <div className="p-[0.5rem] w-[12rem] h-[8rem] lg:p-[1rem] lg:w-[20rem] lg:h-[10rem] ">
            <h3 className="text-title font-semibold lg:text-[16px] text-[10px] ">
              Name 2
            </h3>
            <p className="text-para lg:text-[14px] text-[8px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Praesentium dolore, eligendi similique obcaecati enim repellat
            </p>
            <p className="flex flex-row gap-4 mt-[3px] lg:mt-[5px]">
              <a href="#">
                <Github size={20} />
              </a>
              <a href="#">
                <Twitter size={20} />
              </a>
              <a href="#">
                <Linkedin size={20} />
              </a>
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-50 h-[8rem] lg:w-90 lg:h-[10rem] border border-borderN shadow-lg  overflow-hidden flex lg:flex-row md:flex-row sm:flex-row rounded-r-full rounded-l-full ">
          {/* Image Entry (1/4th) */}
          <div className="w-[8rem] h-[8rem] lg:w-[10rem] lg:h-[10rem]  bg-gray-400 rounded-full"></div>

          {/* Data Entry (3/4th) */}
          <div className="p-[0.5rem] w-[12rem] h-[8rem] lg:p-[1rem] lg:w-[20rem] lg:h-[10rem] ">
            <h3 className="text-title font-semibold lg:text-[16px] text-[10px] ">
              Name 3
            </h3>
            <p className="text-para lg:text-[14px] text-[8px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              fugiat officia qui dolorum suscipit id itaque dolor.
            </p>
            <p className="flex flex-row gap-4 mt-[3px] lg:mt-[5px]">
              <a href="#">
                <Github size={20} />
              </a>
              <a href="#">
                <Twitter size={20} />
              </a>
              <a href="#">
                <Linkedin size={20} />
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="flex justify-center items-center lg:mt-[3rem] mt-[1.5rem] ">
        {/* Card 4 */}
        <div className="w-50 h-[8rem] lg:w-90 lg:h-[10rem] border border-borderN shadow-lg  overflow-hidden flex lg:flex-row md:flex-row sm:flex-row rounded-r-full rounded-l-full ">
          {/* Image Entry (1/4th) */}
          <div className="w-[8rem] h-[8rem] lg:w-[10rem] lg:h-[10rem]  bg-gray-400 rounded-full"></div>

          {/* Data Entry (3/4th) */}
          <div className="p-[0.5rem] w-[12rem] h-[8rem] lg:p-[1rem] lg:w-[20rem] lg:h-[10rem] ">
            <h3 className="text-title font-semibold lg:text-[16px] text-[10px]">
              Name 4
            </h3>
            <p className="text-para lg:text-[14px] text-[8px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              fugiat officia qui dolorum suscipit id itaque dolor.
            </p>
          </div>
        </div>
      </div>

      {/* Project Description */}
      <div className="text-title text-[1.5rem] font-semibold mt-[4.8rem]">
        Project Description
      </div>
    </div>
  );
};

export default aboutUs;
