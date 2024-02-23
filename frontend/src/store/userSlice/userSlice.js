import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
    loading: false,
    error: null
};

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{

    },
    extraReducers:builder=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading=true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
            state.user=action.payload;
            console.log("Data in userSlice",action.payload);
            state.loading=false;
        })
        .addCase(login.rejected,(state)=>{
            state.loading=false;
            state.error="Error accured in user slice";
        })
        .addCase(logOut.fulfilled,(state,action)=>{
            console.log("Log out",action.payload);
        })
    }
});

export const login=createAsyncThunk(
    "user/login",
    async(params)=>{
        try{
            console.log("Params:",params);
            const {data}=await axios.post("http://localhost:3000/login",{
                ...params
            })
            return data;
        }catch{

        }
    }
);

export const logOut=createAsyncThunk(
    "user/logOut",
    async()=>{
        localStorage.removeItem("userInfo");
        const { data } = await axios.get("http://localhost:3000/logout");
        return data;
    }
)

export default userSlice.reducer;