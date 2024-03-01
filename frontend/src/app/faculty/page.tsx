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
import { useQuery } from '@tanstack/react-query';
import { getBranchSubjects } from '@/services/apiBranches';
import Search from '@/components/Search';
import { Loader2 } from 'lucide-react';

const FacultyPage = () => {
  const { user, jwt } = useContext<any>(AuthContext);
  const [branch, setBranch] = useState<string>();
  const [finalList, setFinalList] = useState<any>();

  const { data: subjects, isFetching } = useQuery({
    queryKey: [`branch-${branch}`],
    queryFn: () => getBranchSubjects(jwt, branch),
    enabled: Boolean(jwt),
  });

  return (
    <div className="container flex-grow py-[3rem]">
      <div className="flex items-center justify-between flex-col lg:flex-row gap-5">
        <h1 className="lg:text-[2rem] text-[1.7rem] font-fontPrimary tracking-[1.5px] ">
          Welcome, {user ? user.name : ''}{' '}
        </h1>
        <div className="flex flex-col lg:flex-row gap-5 items-center lg:gap-[1.5rem]">
          <div className="w-[295px]">
            {subjects && (
              <Search subjects={subjects} setFinalList={setFinalList} />
            )}
          </div>
          <div className="flex gap-[1.5rem]">
            <div className="w-[180px]">
              <Select onValueChange={(e) => setBranch(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Branches</SelectLabel>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="ECE">ECE</SelectItem>
                    <SelectItem value="ISE">ISE</SelectItem>
                    <SelectItem value="EEE">EEE</SelectItem>
                    <SelectItem value="ME">ME</SelectItem>
                    <SelectItem value="AE">AE</SelectItem>
                    <SelectItem value="CE">CE</SelectItem>
                    <SelectItem value="PHY">Physics</SelectItem>
                    <SelectItem value="CHE">Chemistry</SelectItem>
                    <SelectItem value="MAT">Maths</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Sheet>
              <SheetTrigger>
                <Button>Add Subject</Button>
              </SheetTrigger>
              <AddSubject />
            </Sheet>
          </div>
        </div>
      </div>

      <div className="py-[2rem] grid lg:grid-cols-4  gap-[1.5rem]">
        {isFetching ? (
          <Loader2 className="mr-2 h-12 w-12 animate-spin" />
        ) : subjects ? (
          subjects.length > 0 ? (
            (finalList && finalList.length > 0 ? finalList : subjects).map(
              (subject) => (
                <SubjectDisplay
                  key={subject._id}
                  link={`faculty/${subject._id}`}
                  name={subject.name}
                />
              )
            )
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
