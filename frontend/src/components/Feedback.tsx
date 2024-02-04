'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Feedback = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(data: any) {
    data.user = user.name;
    const req = await fetch(
      'http://localhost:3000/api/v1/note-nestle/subjects/feedbacks',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const data1 = await req.json();
    console.log(data1);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center"
    >
      <div className="grid w-full lg:w-1/2 gap-[1.5rem] text-start">
        <Label htmlFor="message-2" className="text-[1.2rem]">
          Title
        </Label>
        <Input
          type="text"
          placeholder="Enter Title"
          className="text-[1.2rem]  "
          required
        />
        <Label htmlFor="message-2" className="text-[1.2rem]">
          Your Message
        </Label>
        <Textarea
          placeholder="Type your message here"
          className="text-[1.2rem]"
          required
        />

        <Button
          type="submit"
          className="text-[1.2rem] py-[1.5rem] text-title bg-bgN hover:text-titleA hover:bg-bgA"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Feedback;
