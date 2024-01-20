import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import SubjectDisplay from './SubjectDisplay';
import Unit from './Unit';
import AddUnit from './AddUnit';

function Subject({ id, setOpenSubject }) {
  const [subjectDetails, setSubjectDetails] = useState();
  const [unitId, setUnitId] = useState();
  const [openUnit, setOpenUnit] = useState();
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const { jwt } = useContext(AuthContext);

  useEffect(
    function () {
      async function fetchData() {
        if (!jwt || !id) {
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

  async function handleDelete() {
    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/deleteSubject/${id}`,
      {
        method: 'DELETE',
      }
    );
    console.log(req.ok);
  }

  return (
    <div>
      {!openUnit && (
        <>
          <h2>{subjectDetails && subjectDetails.name}</h2>
          <p>Branch: {subjectDetails && subjectDetails.branch}</p>
          {subjectDetails &&
            subjectDetails.units.map((unit) => (
              <SubjectDisplay
                subject={unit}
                setId={setUnitId}
                setOpenSubject={setOpenUnit}
              />
            ))}
          <div>
            <button onClick={() => setOpenAddFolder(true)}>Add Folder</button>
          </div>
          <div>
            <button onClick={handleDelete}>Delete Entire Subject</button>
          </div>
          <div>
            <button onClick={() => setOpenSubject(false)}>Back</button>
          </div>
        </>
      )}
      {openUnit && (
        <Unit
          unitId={unitId}
          units={subjectDetails.units}
          setOpenUnit={setOpenUnit}
          id={id}
        />
      )}
      {openAddFolder && <AddUnit id={id} setOpenAddFolder={setOpenAddFolder} />}
    </div>
  );
}

export default Subject;
