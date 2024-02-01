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
    <>
      <header className="padding-x py-8 absolute z-50 w-full">
        <nav className="flex flex-end justify-between items-center max-container">
          <Link
            href="/"
            className="font-heading font-bold leading-normal text-2xl text-white "
          >
            NOTE NESTLE
          </Link>
          <ul className="flex-1 flex justify-end items-center gap-16 max-lg:hidden">
            <button
              className="nav-link"
              onClick={() => setOpenBranches(!openBranches)}
            >
              Branches
            </button>

            <li>
              <Link href="/faculty" className="nav-link ">
                Faculty
              </Link>
            </li>
            <li>
              <Link href="/admin" className="nav-link">
                Admins
              </Link>
            </li>
            <li>
              <a href="#feedback" className="nav-link ">
                Feedback
              </a>
            </li>
            <li>
              <Link href="/aboutUs" className="nav-link">
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {openBranches && <Branches setOpenBranches={setOpenBranches} />}
    </>
  );
};

export default Navbar;
