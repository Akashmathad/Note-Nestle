import Link from 'next/link';
import React from 'react';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';

const Branches = () => {
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
        <div key={branch.branch}>
          <NavigationMenuLink className="block w-[16rem] hover:bg-slate-900">
            <Link href={`/${branch.branch}`}>{branch.name}</Link>
          </NavigationMenuLink>
        </div>
      ))}
    </div>
  );
};

export default Branches;
