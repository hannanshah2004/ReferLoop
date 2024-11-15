import type { Metadata } from 'next';

import '../globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserProvider } from '@/components/UserProvider';

export const metadata: Metadata = {
  title: 'ReferLoop',
  description: 'Referral Site for Credit Cards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <Navbar />
          <main className="relative overflow-hidden">
            {children}
          </main>
          <Footer />
        </body>
      </UserProvider>
    </html>
  )
}
