'use client';
import { Dashboard } from '@/models/Dashboard';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {  DashboardsResponse } from '@/lib/handlers';

interface DashboardProps {
  dashboard: Dashboard;
  dashboards: DashboardsResponse[];
  updateDashboards: (dashboards: DashboardsResponse[]) => void;
}

export default function DashboardButton( {dashboard, dashboards, updateDashboards} : DashboardProps) {
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  const handleDelete = async () => {
    try {
      console.log(dashboard._id);

      const res = await fetch(
        `/api/users/${session?.user._id}/dashboards/${dashboard._id}`,
        {
          method: 'DELETE',
        }
      );

      if (res.ok) {
        const remainingDashboards = dashboards.filter(dashboardItem => dashboardItem._id !== dashboard._id);
        updateDashboards(remainingDashboards);
        console.log('Dashboard deleted');
        
        //const body = await res.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link href={'/dashboards/' + dashboard._id}>
        <button className='mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          {dashboard.description}
        </button>
        <p>{String(dashboard._id)}</p>
      </Link>
      <button
        onClick={handleDelete}
        className='mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        DELETE
      </button>
    </div>
  );
}
