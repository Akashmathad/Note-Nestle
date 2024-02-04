import React from 'react';
import Link from 'next/link';

const Branch = ({ branch }) => {
  return (
    <div className=" border-borderN border-[1px] rounded-[0.5rem] p-[2rem]  text-start justify-start items-start">
      <div className="mb-[1.5rem]  text-slate-400">{branch.icon}</div>
      <div className="mb-[1.5rem]">
        <Link
          className="text-[1.5rem] lg:text-[2rem] font-fontPrimary text-title"
          href={`/${branch.branch}`}
        >
          {branch.name}
        </Link>
      </div>
      <div className="text-base text-para">{branch.description}</div>
    </div>
  );
};

export default Branch;
