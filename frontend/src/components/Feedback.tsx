'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('title')} placeholder="Title" />
      <input
        type="text"
        {...register('description')}
        placeholder="Description"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Feedback;
