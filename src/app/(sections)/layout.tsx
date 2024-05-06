import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import { DashboardProvider } from '@/providers/DashboardProvider';
import { VideoProvider } from '@/providers/VideoProvider';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col '>
      <Navbar />
      
      <main className=' w-full my-auto'>
        <DashboardProvider>
            <VideoProvider>
        {children}
        </VideoProvider>
        </DashboardProvider>
      </main>
        <Footer />
    </div>
  );
}
