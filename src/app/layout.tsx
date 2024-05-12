import { NextAuthProvider } from '@/providers/NextAuthProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard for your project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
      <NextAuthProvider>
        {children}
      </NextAuthProvider>
        </body>
    </html>
  );
}
