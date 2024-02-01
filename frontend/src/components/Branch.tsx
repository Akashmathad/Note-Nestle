import React from 'react';
import Link from 'next/link';

const Branch = ({ branch }) => {
  return (
    <div className="p-10  border-solid border-[1px] border-gray-400 rounded-lg text-start ">
      <Link className="font-heading text-2xl mb-8" href={`/${branch.branch}`}>
        {branch.name}
      </Link>
      <p className="text-base text-zinc-400 mt-4 font-para">
        {branch.description}
      </p>
    </div>
  );
};

export default Branch;
