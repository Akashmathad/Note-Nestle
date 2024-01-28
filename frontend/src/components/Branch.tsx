import React from 'react';
import Link from 'next/link';

const Branch = ({ branch }) => {
  return (
    <div>
      <Link href={`/${branch.branch}`}>{branch.name}</Link>
    </div>
  );
};

export default Branch;
