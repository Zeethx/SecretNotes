import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SecretNotes',
  description: 'Make a Difference, Anonymously.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
      <AuthProvider>
        <body className={`${urbanist.className}`}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}