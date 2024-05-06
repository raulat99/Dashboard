// 'use client'
import {SessionUser} from '@/models/Session';
import Link from 'next/link';

interface DashboardProps {
    dashboard: SessionUser ;
  }

export default function DashboardButton({dashboard}: DashboardProps)
{
    return (
        <Link href={'/dashboard/' + dashboard._id}>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                {dashboard.description}</button>
            <p>{String(dashboard._id)}</p>
        </Link>       
    );
}