'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthContext } from '@/context/AuthContextContainer';
import { UnlockKeyhole, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const { storeUserAndJwt, setUser, setJwt } = useContext<any>(AuthContext);

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
    <div className="w-full h-[100vh] absolute z-10 light:bg-[rgba(255, 255, 255, 0.7)] dark:bg-[rgba(0,0,0,0.85)] top-0 left-0 backdrop-blur">
      <div className=" grid p-[3rem]  items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  border border-borderN gap-[1.5rem] rounded-[11px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[21rem] flex flex-col gap-[2rem]"
        >
          <p className="text-[3rem] font-fontPrimary text-center">Login Page</p>
          <div className="relative">
            <User className="absolute top-2 left-1" />
            <Input
              type="text"
              {...register('collegeId')}
              placeholder="Enter your college Id"
              required
              className="text-[1.2rem] pl-[2.5rem]"
            />
          </div>
          <div className="relative mt-[-1rem]">
            <UnlockKeyhole className="absolute top-2 left-1" />
            <Input
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              required
              className="text-[1.2rem]  pl-[2.5rem]"
            />
          </div>
          <Button type="submit" className="w-full mt-[-1rem]">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
