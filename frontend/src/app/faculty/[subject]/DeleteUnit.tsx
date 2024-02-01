import React, { useState } from 'react';
import {
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const DeleteUnit = ({ id, subjectDetails }) => {
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
    setUnitName('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(unitName);
    const unitId = subjectDetails.units.filter(
      (unit) => unit.name === unitName
    )[0]._id;
    handleDelete(unitId);
  }

  return (
    <SheetContent side="bottom">
      <form onSubmit={handleSubmit}>
        <SheetTitle>Delete Unit</SheetTitle>
        <SheetDescription>
          Enter the name of the unit you want to delete from{' '}
          {subjectDetails && subjectDetails.name}. (Case sensitive)
        </SheetDescription>
        <input
          type="text"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          placeholder="Enter the Unit name"
        />
        <SheetFooter>
          <SheetClose>
            <Button type="button" variant="outline">
              Close
            </Button>
          </SheetClose>
          <Button type="submit">Submit</Button>
        </SheetFooter>
      </form>
    </SheetContent>
  );
};

export default DeleteUnit;
