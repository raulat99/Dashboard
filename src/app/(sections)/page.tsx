import Footer from '@/components/Footer';
import Header from '@/components/Header';
import UploadDataButton from '@/components/UploadDataButton';
import { authOptions } from '@/lib/authOptions';
import { Session, getServerSession } from 'next-auth';

export default async function Index() {
  const session: Session | null = await getServerSession(authOptions);
  return (

    <div className= "text-center">
    <div className='absolute inset-0 bg-cover bg-center filter blur-md' style={{ backgroundImage: 'url(https://pro2-bar-s3-cdn-cf6.myportfolio.com/5a142761-664b-4e50-ad0d-d1e9b5b316ef/ab2dcc26-562a-4138-9cf1-5899f8b2d875_rw_1200.gif?h=06d091ffe85bb25d463b023d631d6005)' }}></div>

      <div className='relative z-10 flex flex-col items-center justify-center text-center'>
        <Header />
        {session ? (
          <div className="display flex flex-row space-x-4 justify-center">
            {/* <p className="text-white text-xl font-bold  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">This is the main page.</p> */}
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 my-4 rounded"> 
              <a href="/dashboards" >View Dashboards</a>
              </button>
            <UploadDataButton hrefDirection='/dashboards'/>
          </div>
        ) : (
          <p className="text-white text-xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">You are not logged in</p>
        )}
      </div>
      <Footer />

    </div>
  );
}
