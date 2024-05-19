import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { notFound, redirect } from 'next/navigation';
import { Session } from 'next-auth';
import {
  DashboardsResponse,
  UserResponse,
  getUser,
  getUserDashboards,
} from '@/lib/handlers';
import Link from 'next/link';
import {
  UserIcon,
  EnvelopeIcon,
  BuildingStorefrontIcon,
  CakeIcon,
} from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

export default async function Profile() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const userData: UserResponse | null = await getUser(session.user._id);

  const dashbardData: DashboardsResponse | null = await getUserDashboards(session.user._id);

  if (!userData || !dashbardData) {
    notFound();
  }

  return (
    <div className='display flex items-center flex-col '>
      
      <div className='flex flex-col'>
      <h2 className='pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8'>
        My Profile
      </h2>
        <div className='flex flex-row'>
          <UserIcon className='h-6 w-6' />
          <span className='ml-5 text-sm font-bold text-gray-900'>
            Full Name:{' '}
          </span>
          <span className='ml-5 text-sm text-gray-500'>
            {' '}
            {userData.name + ' ' + userData.surname}
          </span>
        </div>

        <div className='flex flex-row'>
          <EnvelopeIcon className='h-6 w-6' />
          <span className='ml-5 text-sm font-bold text-gray-900'>Email: </span>
          <span className='ml-5 text-sm text-gray-500'> {userData.email}</span>
        </div>

      </div> 
    </div>
  );
}
