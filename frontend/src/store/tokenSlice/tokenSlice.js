import {  createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const initialState={
    token: false
}

const tokenSlice=createSlice({
    name:"token",
    initialState,
    reducers:{
        setUserToken:(state)=>{
            state.token=true;
        },
        openModal:(state)=>{
            state.token=false;
            console.log("Modal open");
        },
        closeModal:(state)=>{
            state.token=true;
            console.log("Modal closed");
        }
    }
})

export const {setUserToken,openModal,closeModal}=tokenSlice.actions;

export default tokenSlice.reducer;