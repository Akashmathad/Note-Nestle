import React, { useState } from 'react';
import {
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';
import { Input } from '@/components/ui/input';

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
      <p className="text-[2rem] font-fontPrimary text-center tracking-[1.5px]">
        Add Subject
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex lg:px-[15%] py-[1.5rem] gap-[2rem]">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Title"
            className="text-[1.2rem]"
            required
          />
          <Select value={branch} onValueChange={(e) => setBranch(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Branches</SelectLabel>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="EEE">EEE</SelectItem>
                <SelectItem value="ME">ME</SelectItem>
                <SelectItem value="AE">AE</SelectItem>
                <SelectItem value="CE">CE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button type="button" variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
          <Button type="submit" className="mb-[1rem] lg:mt-0">
            Submit
          </Button>
        </SheetFooter>
      </form>
    </SheetContent>
  );
};

export default AddSubject;
