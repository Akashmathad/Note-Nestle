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
      <SheetTitle className="text-[1.5rem] font-fontPrimary text-center tracking-[1.5px]">
        <p>Add Unit</p> <p>({subjectName})</p>
      </SheetTitle>
      <form
        onSubmit={handleSubmit}
        className="py-[1.5rem] flex flex-col gap-[1rem]"
      >
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the name of the Unit"
          required
        />
        <SheetFooter className="flex flex-col  gap-[1rem] mt-[1rem]">
          <SheetClose>
            <Button variant="outline" type="reset" className="w-full">
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
