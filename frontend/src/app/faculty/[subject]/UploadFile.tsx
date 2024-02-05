import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AuthContext } from '@/context/AuthContextContainer';
import { Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

function UploadFile({ id, unitId, unitName }) {
  const { user } = useContext<any>(AuthContext);
  const [title, setTitle] = useState<string>();
  const [file, setFile] = useState<any | null>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !file) {
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);
      formData.append('ownerName', user.name);

      const req = await fetch(
        `http://localhost:3000/api/v1/note-nestle/subjects/upload/${id}/${unitId}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await req.json();
      console.log(data);
      if (req.ok) {
        toast.success('File uploaded, refresh the page', {
          className: 'toast toast-success',
        });
      }
      setTitle('');
      setFile(null);
    } catch {
      toast.error('Something went wrong, refresh the page', {
        className: 'toast toast-fail',
      });
    } finally {
      setLoading(false);
    }
  }

  console.log(file);

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
            <Button type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!loading && 'Submit'}
            </Button>
          </SheetFooter>
        </div>
      </form>
    </SheetHeader>
  );
}

export default UploadFile;
