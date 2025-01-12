import { createContext, useContext, useState } from "react";

const PriceContext=createContext();

export const PRiceProvider=({children})=>{
    const [data,setData]=useState([]);

    return <PriceContext.Provider value={{data,setData}}>{children}</PriceContext.Provider>
}

export const PriceData=()=>{
    return useContext(PriceContext);
}