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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUnit } from '@/services/apiBranches';

const AddUnit = ({ id, subjectName }) => {
  const [name, setName] = useState<string>('');
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () => addUnit(id, name),
    onSuccess: () => {
      toast.success('Unit added');
      queryClient.invalidateQueries({
        queryKey: [`${id}`],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <SheetHeader>
      <SheetTitle className="text-[1.5rem] font-fontPrimary text-center tracking-[1.5px]">
        <p>Add Unit</p> <p>({subjectName})</p>
      </SheetTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
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
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isPending && 'Submit'}
          </Button>
        </SheetFooter>
      </form>
    </SheetHeader>
  );
};

export default AddUnit;
