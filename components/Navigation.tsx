// components/Navigation.tsx
import Link from 'next/link';
import { NAV_LINKS } from '../constants';  // Importing from constants

const Navigation = () => {
  return (
    <nav>
      <ul>
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href}>
              <a>{link.label}</a> {/* Wrap the label with the Link component */}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
