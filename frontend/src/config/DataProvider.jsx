import { createContext, useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const DataContext=createContext();

const DataProvider=({children})=>{
    const [user,setUser]=useState("");
    const [productData,setProductData]=useState([]);
    const [cart, setCart] = useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        // console.log("Datastate");
    },[navigate]);

    return (
        <DataContext.Provider value={{user,setUser,productData,setProductData,cart,setCart}}>{children}</DataContext.Provider>
    )
}
export const DataState=()=>{
    return useContext(DataContext);
}

export default DataProvider;