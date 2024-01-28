'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContextContainer';
import Branches from './Branches';

const Navbar = () => {
  const { jwt } = useContext(AuthContext);
  const [openBranches, setOpenBranches] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<any>();

  console.log(subjects);

  return (
    <div>
      <Link href="/">Note Nestle</Link>
      <button onClick={() => setOpenBranches(!openBranches)}>Branches</button>
      <Link href="/faculty">Faculty</Link>
      <Link href="/admin">Admins</Link>
      <a href="#feedback">Feedback</a>
      <Link href="/aboutUs">About Us</Link>
      {openBranches && <Branches setOpenBranches={setOpenBranches} />}
    </div>
  );
};

export default Navbar;
