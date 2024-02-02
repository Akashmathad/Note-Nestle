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
    <div>
      <h2>{subjectDetails && subjectDetails.name}</h2>
      <p>Branch: {subjectDetails && subjectDetails.branch}</p>

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
          <Button>Delete Unit</Button>
        </SheetTrigger>
        <DeleteUnit id={id} subjectDetails={subjectDetails} />
      </Sheet>

      <AlertDialog>
        <AlertDialogTrigger>
          <Button>Delete Subject</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <DeleteSubject id={id} name={subjectDetails && subjectDetails.name} />
        </AlertDialogContent>
      </AlertDialog>

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
  );
};

export default Subject;