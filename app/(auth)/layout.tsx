import '../globals.css'

export const metadata = {
  title: 'ReferLoop Login',
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
          {children}
      </body>
    </html>
  );
}
