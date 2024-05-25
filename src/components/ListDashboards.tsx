'use client'

import { DashboardResponse, DashboardsResponse } from "@/lib/handlers";
import { useEffect, useState } from "react";
import DashboardRow from "./DashboardRow";
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

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        DESCRIPTION
                       
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        DATE CREATION
                       
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        SIGNALS
                       
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">View</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {dashboards && dashboards.map((dashboard: any) => {
        return (
          <DashboardRow 
          key = {dashboard._id}
          dashboard={dashboard} 
          dashboards={dashboards}
          updateDashboards={(dashboards: DashboardsResponse[]) => {setDashboards(dashboards)}} />
        )
      })}
        </tbody>
    </table>
</div>

      


    
    </div>
)}