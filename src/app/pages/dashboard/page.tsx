import BarsChart from "@/app/components/BarsChart";
import LinesChart from "@/app/components/LinesChart";
import PiesChart from "@/app/components/PiesChart";
import Video from "@/app/components/ReactVideoPlayer";
import NewVideoComponent from "@/app/components/NewVideoComponent";
import { DashboardProvider } from "@/app/providers/DashboardProvider";
import { useState } from "react";
import Dashboard from "@/app/components/Dashboard";
import { VideoProvider } from "@/app/providers/VideoProvider";



export default function Index() {

  return(
    <DashboardProvider>
      <VideoProvider>
      <Dashboard />
      </VideoProvider>
    </DashboardProvider>
  
  );
}
