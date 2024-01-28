'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useEffect, useState } from 'react';
import Unit from './Unit';
import UploadFile from './UploadFile';
import DeleteFiles from './DeleteFiles';
import DeleteUnit from './DeleteUnit';
import DeleteSubject from './DeleteSubject';
import AddSubject from './AddSubject';

const Subject = ({ params }) => {
  const { jwt } = useContext(AuthContext);
  const [subjectDetails, setSubjectDetails] = useState<any>();
  const [addUnitId, setAddUnitId] = useState<string>();
  const [openAddFile, setOpenAddFile] = useState<boolean>(false);

  const [openDeleteFile, setOpenDeleteFile] = useState<boolean>(false);
  const [openDeleteUnit, setOpenDeleteUnit] = useState<boolean>(false);
  const [openDeleteSubject, setOpenDeleteSubject] = useState<boolean>(false);
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
      <button onClick={() => setOpenDeleteUnit(true)}>Delete Unit</button>
      <button onClick={() => setOpenDeleteSubject(true)}>Delete Subject</button>
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
      {openAddFile && (
        <UploadFile
          id={id}
          unitId={addUnitId}
          setOpenAddFile={setOpenAddFile}
        />
      )}

      {openDeleteFile && addUnitId && (
        <DeleteFiles
          id={id}
          unitId={addUnitId}
          files={getFiles(addUnitId)}
          setOpenDeleteFile={setOpenDeleteFile}
        />
      )}
      {openDeleteUnit && (
        <DeleteUnit
          id={id}
          setOpenDeleteUnit={setOpenDeleteUnit}
          subjectDetails={subjectDetails}
        />
      )}
      {openDeleteSubject && (
        <DeleteSubject
          id={id}
          name={subjectDetails.name}
          setOpenDeleteSubject={setOpenDeleteSubject}
        />
      )}
    </div>
  );
};

export default Subject;
