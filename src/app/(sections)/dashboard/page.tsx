import ControlsVideo from '@/components/ControlsVideo';
import LinesChart from '@/components/LinesChart';
import ReactVideoPlayer from '@/components/ReactVideoPlayer';
import { authOptions } from '@/lib/authOptions';
import { SessionsResponse, getSessions } from '@/lib/handlers';
import { SignalConfig } from '@/models/SignalConfig';
import { Session, getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const session: Session | null = await getServerSession(authOptions);

  const data: SessionsResponse = await getSessions();

  if (!data) notFound();

  console.log(data);

  return (
    <div className='display mt-20 w-full flex-col justify-center '>
      {session ? (
        <div className='mx-2 '>
        <h2 className='text-center'>{data.sessions[0] && "session id: " + data.sessions[0]._id + " -- Descripcion: "  + data.sessions[0].description + " -- Date: " + data.sessions[0].dateCreation  }</h2>

          <div className='flex flex-wrap justify-center gap-4'>
            {data.sessions[0].videos &&
              data.sessions[0].videos.map((videoConfigItem) => {
                return (
                  <ReactVideoPlayer
                    key={videoConfigItem._id}
                    {...videoConfigItem}
                  />
                );
              })}
          </div>

          

          <div className='display w-full flex-col justify-center '>
            {data.sessions[0].videos && <ControlsVideo />}

            {data.sessions[0].signals &&
              data.sessions[0].signals.map((signal: SignalConfig) => {
                return <LinesChart key={signal.signalID} props={signal} />;
              })}
          </div>
        </div>
      ) : (
        <p className='text-center'> You are not logged in </p>
      )}
    </div>
  );
}
