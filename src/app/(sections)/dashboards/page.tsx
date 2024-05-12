import Header from "@/components/Header";
import ListDashboards from "@/components/ListDashboards";
import { authOptions } from "@/lib/authOptions";
import { DashboardsResponse, getUserDashboards } from "@/lib/handlers";
import { Session, getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Dashboards() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const dashboards: DashboardsResponse | null = await getUserDashboards(session.user._id);

  if (!dashboards) {
    notFound();
  }

  //const dashboardsFetch : SessionsResponse = await getSessions();

  //setDashboards(dashboardsFetch.sessions);

 

  return <div className= "text-center">
    <Header />
    This is the dashboards page.

    <ListDashboards />
    
    </div>;
}
