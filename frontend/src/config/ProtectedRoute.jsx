import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({component}) => {

    const user=useSelector(state=> state.user.user);
    const navigate=useNavigate();

    useEffect(()=>{
        if(user===null){
            return navigate("/login");
        }
    },[user]);
  return user&&component;
}

export default ProtectedRoute;