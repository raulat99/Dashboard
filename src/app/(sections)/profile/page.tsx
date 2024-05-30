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
    <div className='display flex items-center flex-col'>
      <div
        className='absolute -z-50 inset-0 bg-cover bg-center filter blur-md'
        style={{ backgroundImage: 'url(https://pro2-bar-s3-cdn-cf6.myportfolio.com/5a142761-664b-4e50-ad0d-d1e9b5b316ef/ab2dcc26-562a-4138-9cf1-5899f8b2d875_rw_1200.gif?h=06d091ffe85bb25d463b023d631d6005)' }}
      ></div>

      <div className='flex flex-col'>
        <h2 className='pb-4 text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:pb-6 lg:pb-8'>
          My Profile
        </h2>
        <div className='flex flex-row items-center mb-2'>
          <UserIcon className='h-8 w-8 text-white' />
          <span className='ml-5 text-lg font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
            Full Name:{' '}
          </span>
          <span className='ml-5 text-lg text-white'>
            {userData.name + ' ' + userData.surname}
          </span>
        </div>

        <div className='flex flex-row items-center mb-2'>
          <EnvelopeIcon className='h-8 w-8 text-white' />
          <span className='ml-5 text-lg font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Email: </span>
          <span className='ml-5 text-lg text-white'>{userData.email}</span>
        </div>
      </div>
    </div>
  );
}
