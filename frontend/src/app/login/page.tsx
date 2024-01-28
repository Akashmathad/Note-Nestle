'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { storeUserAndJwt, setUser, setJwt } = useContext(AuthContext);

  async function onSubmit(data: any) {
    const req = await fetch(
      'http://localhost:3000/api/v1/note-nestle/auth/Login',
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
    storeUserAndJwt(data1.data, data1.token);
    setJwt(data1.token);
    setUser(data1.data);

    router.push('/');
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('collegeId')}
          placeholder="Enter your college Id"
          required
        />
        <input
          type="password"
          {...register('password')}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
