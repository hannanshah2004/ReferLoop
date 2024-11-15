'use client'

import { useRouter } from 'next/navigation';
import { NAV_LINKS } from '../constants';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { useUser } from './UserProvider';

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

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

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/ReferLoop.jpg" alt="ReferLoop logo" width={200} height={200} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

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