import Link from 'next/link';
import React from 'react';

const Branches = ({ setOpenBranches }) => {
  const branches = [
    { branch: 'CSE', name: 'Computer Science' },
    { branch: 'ECE', name: 'Electronics and Communication' },
    { branch: 'EEE', name: 'Electrical and Electronics' },
    { branch: 'ISE', name: 'Information Science' },
    { branch: 'ME', name: 'Mechanical' },
    { branch: 'CV', name: 'Civil' },
    { branch: 'AE', name: 'Auronatical' },
    { branch: 'PHY', name: 'Phycics' },
    { branch: 'CHE', name: 'Chemistry' },
    { branch: 'MAT', name: 'Mathematics' },
  ];

  return (
    <div>
      {branches.map((branch) => (
        <Link
          href={`/${branch.branch}`}
          key={branch.branch}
          onClick={() => setOpenBranches(false)}
        >
          {branch.name}
        </Link>
      ))}
    </div>
  );
};

export default Branches;
