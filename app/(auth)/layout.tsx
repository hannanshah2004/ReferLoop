import { FirebaseProvider } from './contexts/FirebaseContext';

export const metadata = {
  title: 'Next.js with Firebase Authentication',
  description: 'Firebase Authentication Integration with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
