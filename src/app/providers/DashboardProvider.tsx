import React, { createContext, useContext, useState } from "react";
import { Graph } from "../models/Graph";

// const DashboardGraphsContext = React.createContext([] as Graph[]);

// export function useDashboardGraphsContext (){
//     return useContext(DashboardGraphsContext);
// } 

// const DashboardToggleGraphContext = React.createContext((graph: Graph) => {});

// export function useDashboardToggleGraphContext (){
//     return useContext(DashboardToggleGraphContext);
// } 

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

    // const updateCartItems = useCallback((newCartItems: CartItem[]) => {
    //     setCartItems((prevCartItems: CartItem[]) =>
    //       newCartItems.map((newCartItem) => {
    //         const prevCartItem = prevCartItems.find(
    //           (cartItem) => cartItem.product._id === newCartItem.product._id
    //         );
    //         if (prevCartItem && prevCartItem.qty === newCartItem.qty) {
    //           return prevCartItem;
    //         } else {
    //           return newCartItem;
    //         }
    //       })
    //     );
    //   }, []);

    return(
        <DashboardGraphsContext.Provider value={{graphs, dataX, percentajeX, updatePercentajeX,updateGraphs, updateDataX}}>
            {children}
        </DashboardGraphsContext.Provider>
    );
}