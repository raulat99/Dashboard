import Header from '@/components/Header';
import UploadDataButton from '@/components/UploadDataButton';
import { authOptions } from '@/lib/authOptions';
import { Session, getServerSession } from 'next-auth';

export default async function Index() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <div className='text-center'>
      <Header />

      {session ? (
        <div>
          <p>This is the main page. </p>
          <UploadDataButton />
        </div>
      ) : (
        <p> You are not logged in </p>
      )}
    </div>
  );
}
