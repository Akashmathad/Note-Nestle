import React, { useState } from 'react';
import {
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const DeleteUnit = ({ id, subjectDetails }) => {
  const [unitName, setUnitName] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function handleDelete(unitId: string) {
    if (!unitId) return;

    try {
      const req = await fetch(
        `http://localhost:3000/api/v1/note-nestle/subjects/deleteUnit/${id}/${unitId}`,
        {
          method: 'DELETE',
        }
      );
      if (req.ok) {
        toast.success('Unit deleted, refresh the page', {
          className: 'toast toast-success',
        });
      }
      setUnitName('');
    } catch {
      toast.error('Something went wrong, please refresh the page!', {
        className: 'toast toast-fail',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(unitName);
    const unitId = subjectDetails.units.filter(
      (unit) => unit.name === unitName
    )[0]?._id;
    if (!unitId) {
      toast.error('Unit not found!', {
        className: 'toast toast-fail',
      });
      return;
    }
    handleDelete(unitId);
  }

  return (
    <SheetContent side="bottom" className="p-[2.5rem]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[1.5rem]">
        <SheetTitle className="text-[2rem] font-fontPrimary text-center tracking-[1.5px]">
          Delete Unit
        </SheetTitle>
        <SheetDescription className="text-[1.2rem] text-title">
          Enter the name of the unit you want to delete from{' '}
          {subjectDetails && subjectDetails.name}. (Case sensitive)
        </SheetDescription>
        <Input
          type="text"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          placeholder="Example: Unit - 1"
          className="text-[1.2rem] mt-[-1rem]"
        />
        <SheetFooter className="flex flex-col gap-[1rem]">
          <SheetClose>
            <Button type="button" variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
          <Button type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!loading && 'Submit'}
          </Button>
        </SheetFooter>
      </form>
    </SheetContent>
  );
};

export default DeleteUnit;
