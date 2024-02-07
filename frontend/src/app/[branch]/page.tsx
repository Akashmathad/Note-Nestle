'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useEffect, useState } from 'react';
import SubjectDisplay from '../faculty/[subject]/SubjectDisplay';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';

const Branch = ({ params }) => {
  const router = useRouter();
  const { jwt } = useContext<any>(AuthContext);
  const [subjects, setSubjects] = useState<any>();
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(
    function () {
      async function fetchData() {
        if (!jwt) {
          return;
        }

        try {
          const req = await fetch(
            `${url}/api/v1/note-nestle/subjects?branch=${params.branch}&fields=_id,name`,
            {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setSubjects(data.data);
        } catch {
          toast.error('Something went wrong, Please refresh the page!', {
            className: 'toast toast-fail',
          });
        }
      }
      fetchData();
    },
    [jwt, params]
  );

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
      <div className="flex items-center justify-between">
        <h2 className="text-[2.5rem] font-fontPrimary leading-[1.2]">
          {getName(params.branch)}
        </h2>
        <Button onClick={() => router.push('/')}>Back</Button>
      </div>
      <div className="py-[2rem] grid lg:grid-cols-4  gap-[1.5rem]">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject) => (
            <SubjectDisplay
              key={subject._id}
              link={`${params.branch}/${subject._id}`}
              name={subject.name}
            />
          ))
        ) : (
          <p className="text-[1.2rem]">No Subjects available</p>
        )}
      </div>
      <Toaster toastOptions={{ duration: 5000 }} />
    </div>
  );
};

export default Branch;
