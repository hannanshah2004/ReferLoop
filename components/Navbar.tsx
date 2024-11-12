'use client'  // Ensures this component is treated as a client-side component

import { useRouter } from 'next/navigation';  // Correct import from next/navigation
import { NAV_LINKS } from '../constants';  // Correct the import path if necessary
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

const Navbar = () => {
  const router = useRouter();  // Initialize useRouter for navigation

  // Handle Sign Up Button Click
  const handleSignUp = () => {
    // Redirect to the correct auth page
    router.push('/auth');  // Navigate to the /auth page
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      {/* Logo */}
      <Link href="/">
        <Image src="/ReferLoop.jpg" alt="ReferLoop logo" width={200} height={200} />
      </Link>

       {/* Navigation Links */}
       <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            {/* Correct usage of Link without <a> */}
            <Link href={link.href} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Sign Up Button */}
      <div className="lg:flexCenter hidden">
        <Button 
          type="button"
          title="Sign Up"
          icon="/user.svg"
          variant="btn_dark_green"
          onClick={handleSignUp}  // Trigger the handleSignUp function on click
        />
      </div>

      {/* Menu Icon for Mobile */}
      <Image 
        src="/menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
