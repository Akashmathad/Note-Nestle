'use client';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

interface User {
  name: string;
  collegeId: string;
  teacherAccess: boolean;
  adminAccess: boolean;
}

export const AuthContext = createContext({});

const AuthContextContainer = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [jwt, setJwt] = useState<string>();
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(
    function () {
      async function verify() {
        const jwt = localStorage.getItem('jwt');
        const req = await fetch(`${url}/api/v1/note-nestle/auth`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${jwt}`,
          },
        });
        if (req.status === 401) {
          router.push('/login');
        }
        setUser(JSON.parse(localStorage.getItem('user')));
        setJwt(localStorage.getItem('jwt'));
      }
      verify();
    },
    [router]
  );

  function storeUserAndJwt(user: User, token: string) {
    console.log(user, token);
    const newUser = JSON.stringify(user);
    localStorage.setItem('user', newUser);
    localStorage.setItem('jwt', token);
  }

  return (
    <AuthContext.Provider
      value={{ user, jwt, storeUserAndJwt, setUser, setJwt }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextContainer;
