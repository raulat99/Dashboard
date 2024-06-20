import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import { DashboardProvider } from '@/providers/DashboardProvider';
import { VideoProvider } from '@/providers/VideoProvider';
import { NextAuthProvider } from '@/providers/NextAuthProvider';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <Navbar />
      
      <main className='flex-1 w-full my-auto display flex  items-center justify-center'>
        {/* <DashboardProvider>
            <VideoProvider> */}
        {children}
        {/* </VideoProvider>
        </DashboardProvider> */}
      </main>
    </div>
  );
}
