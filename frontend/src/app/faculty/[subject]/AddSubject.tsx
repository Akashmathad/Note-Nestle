import React, { useState } from 'react';
import { SheetContent, SheetClose, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const AddSubject = () => {
  const [name, setName] = useState<string>();
  const [branch, setBranch] = useState<string>();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const data = { name, branch };
    if (!name || !branch) {
      return;
    }
    const req = await fetch(
      'http://localhost:3000/api/v1/note-nestle/subjects/createSubject',
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
    setBranch('');
  }

  return (
    <SheetContent side="top">
      <p>Add Subject</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Title"
          required
        />
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        >
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="ME">ME</option>
          <option value="AE">AE</option>
          <option value="CE">CE</option>
        </select>
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

export default AddSubject;
