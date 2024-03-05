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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUnit } from '@/services/apiBranches';

const DeleteUnit = ({ id, subjectDetails }) => {
  const [unitName, setUnitName] = useState<string>();

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (newUnitId: string) => deleteUnit(id, newUnitId),
    onSuccess: () => {
      toast.success('Unit deleted');
      setUnitName('');
      queryClient.invalidateQueries({
        queryKey: [`${id}`],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSubmit(e) {
    e.preventDefault();
    const newUnitId = subjectDetails.units.filter(
      (unit) => unit.name === unitName
    )[0]?._id;
    if (!newUnitId) {
      toast.error('Unit not found!', {
        className: 'toast toast-fail',
      });
      return;
    }

    mutate(newUnitId);
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
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isPending && 'Submit'}
          </Button>
        </SheetFooter>
      </form>
    </SheetContent>
  );
};

export default DeleteUnit;
