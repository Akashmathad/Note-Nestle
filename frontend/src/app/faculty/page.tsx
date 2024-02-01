'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useEffect, useState } from 'react';
import SubjectDisplay from '@/app/faculty/[subject]/SubjectDisplay';
import AddSubject from './[subject]/AddSubject';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const FacultyPage = () => {
  const { user, jwt } = useContext(AuthContext);
  const [branch, setBranch] = useState<string>();
  const [subjects, setSubjects] = useState<any>([{}]);
  useEffect(
    function () {
      async function fetchData() {
        if (!jwt || !branch) {
          return;
        }
        const req = await fetch(
          `http://localhost:3000/api/v1/note-nestle/subjects?branch=${branch}&fields=_id,name`,
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
      }
      fetchData();
    },
    [jwt, branch]
  );

  return (
    <div>
      {' '}
      <h1>Welcome, {user ? user.name : ''} </h1>
      <select value={branch} onChange={(e) => setBranch(e.target.value)}>
        <option value="">Select Branch</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="ME">ME</option>
        <option value="AE">AE</option>
        <option value="CE">CE</option>
      </select>
      <Sheet>
        <SheetTrigger>Add Subject</SheetTrigger>
        <AddSubject />
      </Sheet>
      {subjects && subjects.length > 0 ? (
        subjects.map((subject) => (
          <SubjectDisplay
            key={subject._id}
            link={`faculty/${subject._id}`}
            name={subject.name}
          />
        ))
      ) : (
        <p>No Subjects available</p>
      )}
    </div>
  );
};

export default FacultyPage;
