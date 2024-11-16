'use client'

import { useRouter } from 'next/navigation';
import { NAV_LINKS } from '../constants';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { useUser } from './UserProvider';
import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const handleSignUp = () => {
    router.push('/sign-in');
  };

  const handleLogout = () => {
    // Implement logout logic here
    setUser(null);
    // Clear any stored auth tokens
    // localStorage.removeItem('authToken');
    router.push('/');
  };

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/ReferLoop.jpg" alt="ReferLoop logo" width={200} height={200} />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop User Account */}
      <div className="lg:flexCenter hidden">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-50">{user.username}</span>
            <Button 
              type="button"
              title="Log Out" 
              icon="/logout.svg" 
              variant="btn_dark_green" 
              onClick={handleLogout} 
            />
          </div>
        ) : (
          <Button 
            type="button"
            title="Sign Up"
            icon="/user.svg"
            variant="btn_dark_green"
            onClick={handleSignUp}
          />
        )}
      </div>

      {/* Hamburger Icon for Mobile */}
      <Image 
        src="/menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
        onClick={toggleMenu} // When clicked, toggle the menu state
      />

      {/* Mobile Menu - Display when isMenuOpen is true */}
      <div className={`lg:hidden absolute top-20 left-0 w-full bg-gray-800 text-white p-4 transition-all ease-in-out ${isMenuOpen ? 'block' : 'hidden'}`}>
        {NAV_LINKS.map((link) => (
          <Link 
            key={link.key} 
            href={link.href} 
            className="block py-2 text-lg"
            onClick={() => setIsMenuOpen(false)} // Close the menu when a link is clicked
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-4">
          {user ? (
            <Button 
              type="button"
              title="Log Out"
              icon="/logout.svg"
              variant="btn_dark_green"
              onClick={handleLogout}
            />
          ) : (
            <Button 
              type="button"
              title="Sign Up"
              icon="/user.svg"
              variant="btn_dark_green"
              onClick={handleSignUp}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
