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

export default function DashboardRow( {dashboard, dashboards, updateDashboards} : DashboardProps) {
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
  dashboard ? (
    <tr className="bg-white border-b">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {dashboard._id?.toString() ?? ''}
    </th>
    <td className="px-6 py-4">
      {dashboard.description?.toString() ?? ''}
    </td>
    <td className="px-6 py-4">
    {dashboard.dateCreation?.toString() ?? ''}
    </td>
    <td className="px-6 py-4">
        {dashboard.signals && dashboard.signals.map((signal) => <div key={signal._id}>{signal.name}</div>)}
    </td>
    <td className="px-6 py-4 text-right">
        <Link href={'/dashboards/' + dashboard._id} className="font-medium text-blue-600 hover:underline">View</Link>
    </td>
    <td className="px-6 py-4 text-right">
        <button onClick={handleDelete} className="font-medium text-red-600 hover:underline focus:outline-none">Delete</button>
    </td>
</tr>
  ): 'No available'
    
  );
}
