import DashboardButton from "@/components/DashboardButton";
import Header from "@/components/Header";
import UploadDataButton from "@/components/UploadDataButton";
import { SessionsResponse, getSessions } from "@/lib/handlers";
import { SessionUser } from "@/models/Session";

export const dynamic = 'force-dynamic';

export default async function Index() {

  const dashboards : SessionsResponse = await getSessions();
  
  return <div className= "text-center">
    <Header />
    This is the dashboards page.

    <div className="py-8 display flex flex-row place-content-center space-x-8 ">

      {dashboards.sessions.map((dashboard: SessionUser) => {
        return (
          <DashboardButton key={dashboard._id?.toString()} dashboard={dashboard} />
        )
      })}

    </div>
    
    </div>;
}
