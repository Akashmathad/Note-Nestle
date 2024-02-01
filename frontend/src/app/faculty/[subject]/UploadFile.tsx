import { Button } from '@/components/ui/button';
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useState } from 'react';

function UploadFile({ id, unitId, unitName }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState<string>();
  const [file, setFile] = useState<any | null>();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !file) {
      return;
    }

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
    setTitle('');
    setFile(null);
  }

  console.log(file);

  return (
    <SheetHeader>
      <SheetTitle>Add files ({unitName})</SheetTitle>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <SheetClose>
          <Button variant="outline" type="reset">
            Cancel
          </Button>
        </SheetClose>
        <Button type="submit">Submit</Button>
      </form>
    </SheetHeader>
  );
}

export default UploadFile;
