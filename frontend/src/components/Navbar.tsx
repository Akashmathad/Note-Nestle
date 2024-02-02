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
    <div>
      <Link href="/">Note Nestle</Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Branches</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Branches />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link href="/faculty">Faculty</Link>
      <Link href="/admin">Admins</Link>
      <Link href="/#feedback">Feedback</Link>
      <Link href="/aboutUs">About Us</Link>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
