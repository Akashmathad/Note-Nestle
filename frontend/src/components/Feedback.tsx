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
    <div className="grid grid-cols-1 mt-20 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="px-10 py-5 mb-10 rounded-md w-2/3 border-solid border-2 border-black"
          type="text"
          {...register('title')}
          placeholder="Title"
        />
        <input
          className="px-10 py-5 mb-10 rounded-md w-2/3 border-solid border-2 border-black"
          type="text"
          {...register('description')}
          placeholder="Description"
        />
        <button
          className="text-white text-xl font-bold px-4 py-4 bg-black w-2/3 rounded-lg hover:bg-white hover:text-black hover:border hover:border-black hover:border-5 "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Feedback;
