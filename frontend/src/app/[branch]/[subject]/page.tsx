'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useEffect, useState } from 'react';
import Unit from './Unit';
import { useRouter } from 'next/navigation';

const Subject = ({ params }) => {
  const { jwt } = useContext(AuthContext);
  const router = useRouter();
  const [subjectDetails, setSubjectDetails] = useState<any>();
  useEffect(
    function () {
      async function fetchData() {
        if (!jwt) {
          return;
        }
        const req = await fetch(
          `http://localhost:3000/api/v1/note-nestle/subjects?_id=${params.subject}`,
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
    [jwt, params]
  );

  return (
    <div>
      <h2>{subjectDetails && subjectDetails.name}</h2>
      {subjectDetails &&
        subjectDetails.units.map((unit) => (
          <Unit
            id={subjectDetails._id}
            unitId={unit._id}
            unit={unit}
            key={unit._id}
          />
        ))}
      <button onClick={() => router.push(`/${params.branch}`)}>Back</button>
    </div>
  );
};

export default Subject;
