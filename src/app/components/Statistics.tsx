"use client";

import { useEffect, useRef } from "react";


export default function Statistics(props:any) {

    const textValorX = useRef(null);
    const textValorY = useRef(null);

    useEffect(() => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        //textValorX.current.textContent = props.dataX;
        //textValorY.current.textContent = props.dataY;
        

    }, [[], props.dataX, props.dataY]);

    return(
    <div className="display flex flex-col">
        <h2> Interacción con el gráfico </h2>
        <h3> Valor de X: </h3>
        <p ref={textValorX}> {props.dataX} </p>
        <h3> Valor de Y: </h3>
        <p ref={textValorY}> {props.dataY} </p>
      </div>
    );

}
