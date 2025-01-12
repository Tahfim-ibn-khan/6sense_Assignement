import './globals.css';

export const metadata = {
  title: '6sense Assignment',
  description: 'A dynamic form built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}