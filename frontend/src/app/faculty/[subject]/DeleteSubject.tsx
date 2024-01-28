'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DeleteSubject = ({ id, name, setOpenDeleteSubject }) => {
  const [confirm, setConfirm] = useState<string>();
  const router = useRouter();

  async function handleDelete() {
    if (confirm !== 'Confirm') {
      console.log('not matching');
      return;
    }
    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/deleteSubject/${id}`,
      {
        method: 'DELETE',
      }
    );
    console.log(req.ok);
    setOpenDeleteSubject(false);
    router.push('/faculty');
  }

  return (
    <div>
      <p>Please type "Confirm" to delete {name} completely. (Case sensitive)</p>
      <input type="text" onChange={(e) => setConfirm(e.target.value)} />
      <button onClick={() => setOpenDeleteSubject(false)}>Cancel</button>
      <button onClick={handleDelete}>Submit</button>
    </div>
  );
};
export default DeleteSubject;
