import ControlsVideo from '@/components/ControlsVideo';
import DownloadButton from '@/components/DownloadButton';
import LinesChartWithInfo from '@/components/LinesChartWithInfo';
import ReactVideoPlayer from '@/components/ReactVideoPlayer';
import UploadDataButton from '@/components/UploadDataButton';
import { authOptions } from '@/lib/authOptions';
import { getUserDashboard } from '@/lib/handlers';
import { SignalConfig } from '@/models/SignalConfig';
import { Session, getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import { FaFileDownload } from 'react-icons/fa';

export default async function Dashboard({
  params  
  }: {
  params: { dashboardId: string };
}) {
    // if (!Types.ObjectId.isValid(params.dashboardId)) {
    //   notFound();
    // }

    // console.log(params)
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }
  
  const data = await getUserDashboard(session.user._id, params.dashboardId);

  if (!data.dashboard) notFound();


  return (
    <div className='display mt-20 w-full flex-col justify-center '>
      {session ? (
        <div className='mx-2 '>
        {/* <h2 className='text-center'>{data.dashboard && "session id: " + data.dashboard._id + " -- Descripcion: "  + data.dashboard.description + " -- Date: " + data.dashboard.dateCreation  }</h2> */}
        <div className='m-2'>
        <h1 className='text-center text-4xl'><b>{data.dashboard && data.dashboard.description}</b></h1>
         {/* {data.dashboard && <DownloadButton dataDownload={data.dashboard} />} */}
         {data.dashboard && <DownloadButton dataDownload={JSON.stringify(data.dashboard, null, 2)}/>}
         </div>
          <div className='flex flex-wrap justify-center gap-4'>
            {data.dashboard.videos && data.dashboard.signals &&
              data.dashboard.videos.map((videoConfigItem) => {
                return (
                  <ReactVideoPlayer
                    key={videoConfigItem._id}
                    url={videoConfigItem.url}
                    videoID={videoConfigItem.videoID}
                    fps={videoConfigItem.fps}
                    signals={data.dashboard.signals}
                  />
                );
              })}
          </div>
          <div className='display w-full flex-col justify-center '>
            {data.dashboard.markers && <ControlsVideo markersUploaded={data.dashboard.markers} dashboardId= {data.dashboard._id}/>}
            
            {data.dashboard.signals &&
              data.dashboard.signals.map((signal: SignalConfig) => {
                return <LinesChartWithInfo key={signal.signalID} props={signal} />;
              })}
          </div>
        </div>
      ) : (
        <p className='text-center'> You are not logged in </p>
      )}
    </div>
  );
}


