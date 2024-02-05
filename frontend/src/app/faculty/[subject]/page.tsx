'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useEffect, useState } from 'react';
import Unit from './Unit';
import UploadFile from './UploadFile';
import DeleteFiles from './DeleteFiles';
import DeleteUnit from './DeleteUnit';
import DeleteSubject from './DeleteSubject';
import AddUnit from './AddUnit';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Toaster } from 'react-hot-toast';

const Subject = ({ params }) => {
  const { jwt } = useContext(AuthContext);
  const [subjectDetails, setSubjectDetails] = useState<any>();
  const [addUnitId, setAddUnitId] = useState<string>();
  const [openAddFile, setOpenAddFile] = useState<boolean>(false);

  const [openDeleteFile, setOpenDeleteFile] = useState<boolean>(false);
  const id: string = params.subject;

  useEffect(
    function () {
      async function fetchData() {
        if (!jwt) {
          return;
        }
        const req = await fetch(
          `http://localhost:3000/api/v1/note-nestle/subjects?_id=${id}`,
          {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = await req.json();
        setSubjectDetails(data.data[0]);
      }
      fetchData();
    },
    [jwt, id]
  );

  function getFiles(id: string) {
    const files = subjectDetails.units.filter((unit) => unit._id === id)[0]
      .files;
    return files;
  }
  addUnitId && getFiles(addUnitId);

  console.log(subjectDetails);

  return (
    <div className="container min-h-[78vh] py-[2rem]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-[1rem]">
        <h2 className="lg:text-[2.5rem] text-[1.8rem] font-fontPrimary leading-[1.2]">
          {subjectDetails && subjectDetails.name}
        </h2>
        <div className="flex gap-[1.5rem] items-center">
          <p className="text-[1.2rem]">
            <span className="font-bold">
              {subjectDetails && subjectDetails.branch}
            </span>
          </p>
          <Sheet>
            <SheetTrigger>
              <Button>Add Unit</Button>
            </SheetTrigger>
            <SheetContent>
              <AddUnit
                id={id}
                subjectName={subjectDetails && subjectDetails.name}
              />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger>
              <Button variant="destructive">Delete Unit</Button>
            </SheetTrigger>
            <DeleteUnit id={id} subjectDetails={subjectDetails} />
          </Sheet>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive">Delete Subject</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <DeleteSubject
                id={id}
                name={subjectDetails && subjectDetails.name}
              />
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="py-[2rem] flex flex-col gap-[1.5rem]">
        {subjectDetails &&
          subjectDetails.units.map((unit) => (
            <Unit
              id={id}
              unitId={unit._id}
              unit={unit}
              key={unit._id}
              setOpenAddFile={setOpenAddFile}
              setAddUnitId={setAddUnitId}
              setOpenDeleteFile={setOpenDeleteFile}
            />
          ))}
      </div>
      <Toaster toastOptions={{ duration: 5000 }} />
    </div>
  );
};

export default Subject;
