'use client'
import DashboardButton from "@/components/DashboardButton";
import Header from "@/components/Header";
import UploadDataButton from "@/components/UploadDataButton";
import { SessionsResponse, getSessions } from "@/lib/handlers";
import { SessionUser } from "@/models/Session";
import { set } from "mongoose";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic';

export default function Index() {

  const [dashboards, setDashboards] = useState<SessionsResponse[]>([]);
  //const dashboardsFetch : SessionsResponse = await getSessions();

  //setDashboards(dashboardsFetch.sessions);

  const fetchDashboards = async () => {
    try {
        const res =  await fetch(`/api/dashboards`, {
          method: 'GET',
        });
  
      if (res.ok) {
        const body = await res.json();
        if(body.sessions != dashboards){
          console.log("hola", body.sessions.length)
          setDashboards(body.sessions);
        }
      }
      } catch (error) {
        console.log(error);
      }
}

  useEffect (() => {
    fetchDashboards();

  },[])

  return <div className= "text-center">
    <Header />
    This is the dashboards page.

    <div className="py-8 display flex flex-row place-content-center space-x-8 ">

      {dashboards && dashboards.map((dashboard: SessionsResponse) => {
        console.log(dashboards);
        return (
          <DashboardButton key={dashboard._id?.toString()} dashboard={dashboard} />
        )
      })}

    </div>
    
    </div>;
}
