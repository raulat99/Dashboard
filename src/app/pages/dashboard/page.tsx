import BarsChart from "@/app/components/BarsChart";
import LinesChart from "@/app/components/LinesChart";
import PiesChart from "@/app/components/PiesChart";
import Video from "@/app/components/Video";
import NewVideoComponent from "@/app/components/NewVideoComponent";
import { DashboardProvider } from "@/app/providers/DashboardProvider";
import { useState } from "react";
import Dashboard from "@/app/components/Dashboard";



export default function Index() {

  return(
  <Dashboard />
  );
}
