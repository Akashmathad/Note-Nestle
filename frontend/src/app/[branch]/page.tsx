'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useEffect, useState } from 'react';
import SubjectDisplay from '../faculty/[subject]/SubjectDisplay';

import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { getBranchSubjects } from '@/services/apiBranches';
import Search from '@/components/Search';
import { useRouter } from 'next/navigation';

const Branch = ({ params }) => {
  const router = useRouter();
  const { jwt } = useContext<any>(AuthContext);
  const { data: subjects } = useQuery({
    queryKey: [`branch-${params.branch}`],
    queryFn: () => getBranchSubjects(jwt, params.branch),
    enabled: Boolean(jwt),
  });
  const [finalList, setFinalList] = useState<any>();

  function getName(branch: string) {
    switch (branch) {
      case 'CSE':
        return 'Computer Science and Engineering';
      case 'ECE':
        return 'Electronics and Communication Engineering';
      case 'EEE':
        return 'Electrical and Electronics Engineering';
      case 'AE':
        return 'Aeronautical Engineering';
      case 'ME':
        return 'Mechanical Engineering';
      case 'CV':
        return 'Civil Engineering';
      case 'PHY':
        return 'Physics';
      case 'CHEM':
        return 'Chemistry';
      case 'MAT':
        return 'Mathematics';
      default:
        return 'Branch not found';
    }
  }

  console.log(subjects);
  return (
    <div className="container min-h-[78vh] py-[3rem]">
      <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
        <h2 className="text-[2.5rem] font-fontPrimary leading-[1.2] text-center">
          {getName(params.branch)}
        </h2>
        <div className="flex gap-5">
          <div className="w-[265px]">
            {' '}
            <Search subjects={subjects} setFinalList={setFinalList} />
          </div>

          <Button onClick={() => router.push('/')}>Back</Button>
        </div>
      </div>
      <div className="py-[2rem] grid lg:grid-cols-4  gap-[1.5rem]">
        {subjects && subjects.length > 0 ? (
          (finalList && finalList.length > 0 ? finalList : subjects).map(
            (subject) => (
              <SubjectDisplay
                key={subject._id}
                link={`${params.branch}/${subject._id}`}
                name={subject.name}
              />
            )
          )
        ) : (
          <p className="text-[1.2rem]">No Subjects available</p>
        )}
      </div>
      <Toaster toastOptions={{ duration: 5000 }} />
    </div>
  );
};

export default Branch;
