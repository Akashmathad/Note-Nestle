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

const Navbar = () => {
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

          <Link className="nav-link" href="/faculty">
            Faculty
          </Link>
          <Link className="nav-link" href="/admin">
            Admins
          </Link>
          <Link className="nav-link" href="/#feedback">
            Feedback
          </Link>
          <Link className="nav-link" href="/aboutUs">
            About Us
          </Link>
        </nav>
        <div className="py-[1rem] ml-[9rem]">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
