'use client';
import React, { useState } from 'react';

const AddUnit = ({ id, setOpenAddUnit }) => {
  const [name, setName] = useState<string>('');

  async function handleSubmit() {
    const data = {
      name,
    };
    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/createUnit/${id}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    console.log(req.ok);
    setOpenAddUnit(false);
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter the name of the Unit"
      />
      <button onClick={() => setOpenAddUnit(false)}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddUnit;
