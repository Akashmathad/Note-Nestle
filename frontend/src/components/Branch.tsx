import React from 'react';
import Link from 'next/link';

const Branch = ({ branch }) => {
  return (
    <Link
      href={`/${branch.branch}`}
      className=" border-borderN border-[1px] rounded-[0.5rem] p-[2rem]  text-start justify-start items-start"
    >
      <div className="mb-[1.5rem] text-title">{branch.icon}</div>
      <div className="mb-[1.5rem]">
        <p className="text-[1.5rem] lg:text-[2rem] font-fontPrimary text-title leading-[1.2]">
          {branch.name}
        </p>
      </div>
      <div className="text-base text-para">{branch.description}</div>
    </Link>
  );
};

export default Branch;
