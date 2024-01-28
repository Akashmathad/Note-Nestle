import React, { useState } from 'react';

const DeleteUnit = ({ id, subjectDetails, setOpenDeleteUnit }) => {
  const [unitName, setUnitName] = useState<string>();

  async function handleDelete(unitId: string) {
    if (!unitId) return;
    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/deleteUnit/${id}/${unitId}`,
      {
        method: 'DELETE',
      }
    );
    console.log(req.ok);
  }

  function handleSubmit() {
    console.log(unitName);
    const unitId = subjectDetails.units.filter(
      (unit) => unit.name === unitName
    )[0]._id;
    handleDelete(unitId);
    setOpenDeleteUnit(false);
  }

  return (
    <div>
      <p>
        Enter the name of the unit which you want to delete (case sensitive)
      </p>
      <input type="text" onChange={(e) => setUnitName(e.target.value)} />
      <button onClick={() => setOpenDeleteUnit(false)}>cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DeleteUnit;
