import Header from "@/components/Header";
import ListDashboards from "@/components/ListDashboards";
import UploadDataButton from "@/components/UploadDataButton";
import { authOptions } from "@/lib/authOptions";
import { DashboardsResponse, getUserDashboards } from "@/lib/handlers";
import { Session, getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Dashboards() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  const dashboards: DashboardsResponse | null = await getUserDashboards(session.user._id);

  if (!dashboards) {
    notFound();
  }

  //const dashboardsFetch : SessionsResponse = await getSessions();

  //setDashboards(dashboardsFetch.sessions);

 

  return (
  <div className= "text-center">
      <div className='absolute -z-50 inset-0 bg-cover bg-center filter blur-md' 
      style={{ backgroundImage: 'url(https://pro2-bar-s3-cdn-cf6.myportfolio.com/5a142761-664b-4e50-ad0d-d1e9b5b316ef/ab2dcc26-562a-4138-9cf1-5899f8b2d875_rw_1200.gif?h=06d091ffe85bb25d463b023d631d6005)' }}></div>

    <Header />
    

    <ListDashboards  />
    
    <UploadDataButton />
    </div>

)

}
