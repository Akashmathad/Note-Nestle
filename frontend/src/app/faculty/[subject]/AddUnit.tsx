'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

const AddUnit = ({ id, subjectName }) => {
  const [name, setName] = useState<string>('');

  async function handleSubmit(e) {
    e.preventDefault();
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
    setName('');
  }

  return (
    <SheetHeader>
      <SheetTitle>Add Unit ({subjectName})</SheetTitle>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the name of the Unit"
          required
        />
        <SheetFooter>
          <SheetClose>
            <Button variant="outline" type="reset">
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit">Submit</Button>
        </SheetFooter>
      </form>
    </SheetHeader>
  );
};

export default AddUnit;
