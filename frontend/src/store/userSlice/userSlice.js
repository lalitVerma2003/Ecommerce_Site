import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload === "Invalid email or password")
                    state.error = action.payload;
                else {
                    localStorage.setItem("userInfo", JSON.stringify(action.payload));
                    state.user = action.payload;
                }
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                state.error = "Error occured in user slice";
            })
            .addCase(registered.fulfilled, (state, action) => {
                localStorage.setItem("userInfo",JSON.stringify(action.payload));
                state.user=action.payload;
                state.loading=false;
            })
            .addCase(logOut.fulfilled, (state, action) => {
                console.log("Log out", action.payload);
            })
    }
});

export const registered = createAsyncThunk(
    "user/registered",
    async (params) => {
        try {
            const {username,password,email,role="user"}=params;
            const { data } = await axios.post("http://localhost:3000/register", {
                username, password, email, role});
            return data;
        } catch (err) {
            return err.response.data;
        }
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (params) => {
        try {
            const { data } = await axios.post("http://localhost:3000/login", {
                ...params
            });
            return data;
        } catch (err) {
            return err.response.data;
        }
    }
);

export const logOut = createAsyncThunk(
    "user/logOut",
    async () => {
        localStorage.removeItem("userInfo");
        const { data } = await axios.get("http://localhost:3000/logout");
        return data;
    }
)

export default userSlice.reducer;