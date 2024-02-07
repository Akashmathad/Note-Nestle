'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useEffect, useState } from 'react';
import SubjectDisplay from '@/app/faculty/[subject]/SubjectDisplay';
import AddSubject from './[subject]/AddSubject';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';
import toast, { Toaster } from 'react-hot-toast';

const FacultyPage = () => {
  const { user, jwt } = useContext<any>(AuthContext);
  const [branch, setBranch] = useState<string>();
  const [subjects, setSubjects] = useState<any>();
  const url = process.env.NEXT_PUBLIC_URL;
  useEffect(
    function () {
      async function fetchData() {
        if (!jwt || !branch) {
          return;
        }
        try {
          const req = await fetch(
            `${url}/api/v1/note-nestle/subjects?branch=${branch}&fields=_id,name`,
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
        } catch (e) {
          toast.error('Something went wrong, Please refresh the page!', {
            className: 'toast toast-fail',
          });
        }
      }
      fetchData();
    },
    [jwt, branch]
  );

  return (
    <div className="container min-h-[78vh] py-[3rem]">
      <div className="flex items-center justify-between flex-col lg:flex-row">
        <h1 className="lg:text-[2rem] text-[1.7rem] mb-[1rem] font-fontPrimary tracking-[1.5px]">
          Welcome, {user ? user.name : ''}{' '}
        </h1>
        <div className="flex items-center gap-[1.5rem]">
          <Select onValueChange={(e) => setBranch(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Branches</SelectLabel>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="EEE">EEE</SelectItem>
                <SelectItem value="ME">ME</SelectItem>
                <SelectItem value="AE">AE</SelectItem>
                <SelectItem value="CE">CE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger>
              <Button>Add Subject</Button>
            </SheetTrigger>
            <AddSubject />
          </Sheet>
        </div>
      </div>

      <div className="py-[2rem] grid lg:grid-cols-4  gap-[1.5rem]">
        {subjects ? (
          subjects.length > 0 ? (
            subjects.map((subject) => (
              <SubjectDisplay
                key={subject._id}
                link={`faculty/${subject._id}`}
                name={subject.name}
              />
            ))
          ) : (
            <p className="text-[1.5rem]">No Subjects available</p>
          )
        ) : (
          <p className="text-[1.5rem]">Please select one branch</p>
        )}
      </div>
      <Toaster toastOptions={{ duration: 5000 }} />
    </div>
  );
};

export default FacultyPage;
