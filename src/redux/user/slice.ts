import { createSlice, PayloadAction, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    loading: boolean,
    error: string | null,
    token: string | null
}

const initialState: UserState = {
    loading: false,
    error: null,
    token: null
}

export const signIn = createAsyncThunk(
    "user/signIn",
   async (params:{
       email: string,
       password: string
   }) => {
       const { data } = await axios.post('http://123.56.149.216:8080/auth/login',
       {
           email: params.email,
           password: params.password
       });
       return data.token;
   }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logOut: (state) => {
            state.token = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers:{
        [signIn.pending.type]: (state) => {
            state.loading = true
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.token = action.payload;
            state.error = null;
        },
        [signIn.rejected.type]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})