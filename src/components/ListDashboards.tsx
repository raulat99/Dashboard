'use client'
import { DashboardResponse, DashboardsResponse } from "@/lib/handlers";
import { useEffect, useState } from "react";
import DashboardRow from "./DashboardRow";
import { useSession } from 'next-auth/react';
import { Dashboard } from "@/models/Dashboard";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartItemsList() {
    const [dashboards, setDashboards] = useState<DashboardsResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession({ required: true });

   // const yourImageSrc = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGtydmR0YnFodzgyajN2MDRvMHVhbzZzcjhiaGZucmRjNnpuc2lsayZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9Zw/W22b2eea2XxB6DiTWg/giphy.webp";
    //const yourImageSrc="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWd5YTh4czE4d3RneGF6YjA3NGdwM3dudmd3bTAzMXQwYTBmcnd5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OiC5BKaPVLl60/giphy.webp"
    
    const yourImageSrc="/img/loading.gif";

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const res = await fetch(`/api/users/${session?.user._id}/dashboards`, {
                    method: 'GET',
                });

                if (res.ok) {
                    const body = await res.json();
                    //console.log(body.dashboards)
                    setDashboards(body.dashboards);
                }
            } catch (error) {
                //console.log(session?.user._id);
                //console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboards();
    }, [session]);

    return (
        <div className="py-8 display flex flex-row place-content-center space-x-8">
            <div className="relative overflow-x-auto ">
            {loading ? 
            (
              <div  className="text-center allign-center">
                            <img src={yourImageSrc} alt="Loading" width={250} height={250} />
                          </div>)
                : 
                (dashboards.length !== 0 ? 
                  <table className="w-full text-sm text-left text-gray-500 shadow-md sm:rounded-lg">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                              <th scope="col" className="px-6 py-3">ID</th>
                              <th scope="col" className="px-6 py-3">
                                  <div className="flex items-center">DESCRIPTION</div>
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  <div className="flex items-center">CREATION DATE</div>
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  <div className="flex items-center">SIGNALS</div>
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
                          
                              {dashboards.map((dashboard: any, i:number) => (
                                  <DashboardRow 
                                      key={dashboard._id}
                                      id={i}
                                      dashboard={dashboard}
                                      dashboards={dashboards}
                                      updateDashboards={(dashboards: DashboardsResponse[]) => { setDashboards(dashboards) }}
                                  />
                              ))       }
                      </tbody>
                  </table> : <p className="text-xl  text-red-400 bg-gray-200 rounded-xl p-4"><b>These are no the sessions available.</b></p>)
                
                }
            </div>
        </div>
    );
}


