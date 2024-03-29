'use client'
import React, { createContext, useContext, useState } from "react";
import { Graph } from "../models/Graph";

interface IDashboardGraphsContext {
    graphs: Graph[];
    dataX: number | null;
    percentajeX: number | null;
    updatePercentajeX: (n: number) => void;
    updateGraphs: (NewGraph: Graph) => void;
    updateDataX: (n: number) => void;
  }
  
  export const DashboardGraphsContext = createContext<IDashboardGraphsContext>({
    graphs: [],
    dataX: null,
    percentajeX: null,
    updatePercentajeX: () => {},
    updateGraphs: () => {},
    updateDataX: () => {},
  });
  
export function DashboardProvider ({children} : {children: React.ReactNode})
{
    const [graphs, setGraphs] = useState<Graph[]>([]);
    const [dataX, setDataX] = useState<number>(null);
    const updateGraphs = (graph : Graph) => {
        setGraphs((prevGraphs: Graph[]) => [...prevGraphs, graph]);
    }

    const [percentajeX, setPercentajeX] = useState<number>(null);

    const updatePercentajeX = (n: number) => {
        setPercentajeX(n)
    }

    const updateDataX = (n: number)=>{
        setDataX(n);
    }

    return(
        <DashboardGraphsContext.Provider value={
            {graphs, 
            dataX, 
            percentajeX, 
            updatePercentajeX,
            updateGraphs, 
            updateDataX}}>
            
            {children}
        </DashboardGraphsContext.Provider>
    );
}