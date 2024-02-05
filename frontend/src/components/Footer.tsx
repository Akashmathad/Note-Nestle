import React from 'react';
import { Copyright } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <div className="bg-bgN ">
      <footer className="container  py-[1.5rem] flex items-center justify-between">
        <p className="text-[1.2rem] lg:text-[1.5rem] font-extrabold text-title">
          NOTE NESTLE
        </p>
        <p className="text-para flex justify-center items-center text-[1.2rem]">
          &copy;
          {new Date().getFullYear()}. All Rights Reserved.
        </p>
        <Link href="/aboutUs">
          <Button>About Us</Button>
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
