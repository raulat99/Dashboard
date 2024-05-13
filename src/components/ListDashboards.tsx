'use client'

import { DashboardResponse, DashboardsResponse } from "@/lib/handlers";
import { useEffect, useState } from "react";
import DashboardButton from "./DashboardButton";
import { useSession } from 'next-auth/react';
import { Dashboard } from "@/models/Dashboard";

export default function CartItemsList() {

    const [dashboards, setDashboards] = useState<DashboardsResponse[]>([]);
    const { data: session } = useSession({ required: true });

   
      useEffect (() => {
        const fetchDashboards = async () => {
          try {
              const res =  await fetch(`/api/users/${session?.user._id}/dashboards`, {
                method: 'GET',
              });
        
            if (res.ok) {
              const body = await res.json();
                setDashboards(body.dashboards);
              
            }
            } catch (error) {
              console.log(session?.user._id)  
              console.log(error);
            }
      }
        fetchDashboards();
      },[session])

      

      
return (
<div className="py-8 display flex flex-row place-content-center space-x-8 ">

      {dashboards && dashboards.map((dashboard: DashboardsResponse) => {
        console.log(dashboards);
        return (
          <DashboardButton 
          key={dashboard._id?.toString()} 
          dashboard={dashboard} 
          dashboards={dashboards}
          updateDashboards={(dashboards: DashboardsResponse[]) => {setDashboards(dashboards)}} />
        )
      })}

    </div>
)}