import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AuthContext } from '@/context/AuthContextContainer';
import { addFile } from '@/services/apiBranches';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

function UploadFile({ id, unitId, unitName }) {
  const { user } = useContext<any>(AuthContext);
  const [title, setTitle] = useState<string>();
  const [file, setFile] = useState<any | null>();

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () => addFile(id, unitId, title, file, user.name),
    onSuccess: () => {
      toast.success('File added');
      setTitle('');
      setFile(null);
      queryClient.invalidateQueries({
        queryKey: [`${id}`],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !file) {
      return;
    }
    mutate();
  }
  return (
    <SheetHeader>
      <SheetTitle className="text-[1.5rem] font-fontPrimary text-center tracking-[1.5px]">
        Add files ({unitName})
      </SheetTitle>
      <form onSubmit={handleSubmit} className="py-[1.5rem]">
        <div className="flex flex-col gap-[1rem]">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
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
        </div>
      </form>
    </SheetHeader>
  );
}

export default UploadFile;
