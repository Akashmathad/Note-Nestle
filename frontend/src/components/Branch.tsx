import React from 'react';
import Link from 'next/link';

const Branch = ({ branch }) => {
  return (
    <div className="border-solid border-borderN border-[1px] rounded-[0.5rem] p-[2rem]  flex-start justify-start items-start">
      <div>{branch.icon}</div>
      <div>
        <Link
          className="lg:text-[2rem] font-fontPrimary text-titleA"
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
