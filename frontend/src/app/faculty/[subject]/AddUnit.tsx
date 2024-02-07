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
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const AddUnit = ({ id, subjectName }) => {
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name,
    };
    try {
      setLoading(true);
      const req = await fetch(
        `${url}/api/v1/note-nestle/subjects/createUnit/${id}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (req.ok) {
        toast.success('Unit added, Refresh the page', {
          className: 'toast toast-success',
        });
      }
      setName('');
    } catch {
      toast.error('Something went wrong, Refresh the page', {
        className: 'toast toast-fail',
      });
    } finally {
      setLoading(false);
    }
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
          <Button type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!loading && 'Submit'}
          </Button>
        </SheetFooter>
      </form>
    </SheetHeader>
  );
};

export default AddUnit;
