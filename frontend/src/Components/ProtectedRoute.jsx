import React, { useEffect } from 'react';
import { DataState } from '../config/DataProvider';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({component}) => {

    const {user}=DataState() || JSON.parse(localStorage.getItem("userInfo"));
    const navigate=useNavigate();

    useEffect(()=>{
        if(!user){
            return navigate("/login");
        }
        // console.log("Protected");
    },[user]);
  return component;
}

export default ProtectedRoute;