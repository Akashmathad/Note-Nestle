'use client';
import Link from 'next/link';
import Branches from './Branches';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from './ui/mode-toggle';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
<<<<<<< HEAD
  return (
    <div className="navbar-component w-full min-h-16 border-b-[1px] flex z-[1000] padding-x bg-bgN text-title top-0">
      <div className="navbar-container justify-between align-middle mx-2 grid grid-cols-7 gap-4 ">
        <Link
          className=" py-[1.5rem] text-xl font-extrabold text-title"
          href="/"
        >
          NOTE NESTLE
        </Link>
        <nav className="flex flex-end col-span-5 ml-20">
          <NavigationMenu className="px-[3rem] py-[1rem] mb-1 hover:text-gray-400">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-bgN  text-base">
                  Branches
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Branches />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
=======
  const [isMenuOpen, setIsMenuOpen] = useState(false);
>>>>>>> cb7bbd03f91f380787cd0e678286e45b2422cf93

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };
  return (
    <header className="bg-bgN py-[1rem] border-b-[1px]">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div>
          <Link className="text-xl font-extrabold text-title" href="/">
            NOTE NESTLE
          </Link>
        </div>
        <div
          className={`md:static absolute bg-bgN md:min-h-fit min-h-[60vh] left-0 ${
            !isMenuOpen ? 'top-[9%]' : 'top-[-100%]'
          } md:w-auto w-full flex justify-center items-center text-center px-[0.3rem]`}
        >
          <ul className="flex  md:flex-row flex-col  md:items-center md:gap-[4vw] gap-8">
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-bgN text-base font-normal hover:text-zinc-500 duration-200">
                      Branches
                    </NavigationMenuTrigger>
                    <NavigationMenuContent onClick={toggleMenu}>
                      <Branches />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                className=" hover:text-zinc-500 duration-200"
                href="/faculty"
              >
                Faculty
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                className="hover:text-zinc-500 duration-200"
                href="/admin"
              >
                Admins
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                className="hover:text-zinc-500 duration-200"
                href="/#feedback"
              >
                Feedback
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                className="hover:text-zinc-500 duration-200"
                href="/aboutUs"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-bgN">
            <ModeToggle />
          </div>
          {isMenuOpen ? (
            <Menu
              onClick={toggleMenu}
              className="text-3xl cursor-pointer md:hidden"
            />
          ) : (
            <X
              onClick={toggleMenu}
              className="text-3xl cursor-pointer md:hidden"
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
