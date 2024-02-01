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

const Navbar = () => {
  return (
    <div>
      <Link href="/">Note Nestle</Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Branches</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4 bg-black text-white">
              <Branches />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link href="/faculty">Faculty</Link>
      <Link href="/admin">Admins</Link>
      <Link href="/#feedback">Feedback</Link>
      <Link href="/aboutUs">About Us</Link>
    </div>
  );
};

export default Navbar;
