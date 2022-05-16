import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkout } from '../shoppingCart/slice'


interface OrderState {
    laoding: boolean;
    error: string | null;
    currentOrder: any;
}

const initialState: OrderState = {
    laoding: false,
    error: null,
    currentOrder: null
}

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
   async (params: {jwt: string, order: string}, thunkAPI) => {
       console.log("打印结算参数",params)
    const {data} = await axios.post(`http://123.56.149.216:8080/api/orders/${params.order}/placeOrder`,null,{
        headers: {
            Authorization: `bearer ${params.jwt}`
        }
    })
    return data;
   }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        [placeOrder.pending.type]: (state) => {
            state.laoding = true;
        },
        [placeOrder.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload;
            state.laoding = false;
            state.error = null;
        },
        [placeOrder.rejected.type]: (state, action:PayloadAction<string | null>) => {
            state.laoding = false;
            state.error = action.payload;
        }, 

        [checkout.pending.type]: (state) => {
            state.laoding = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload;
            state.laoding = false;
            state.error = null;
        },
        [checkout.rejected.type]: (state, action:PayloadAction<string | null>) => {
            state.laoding = false;
            state.error = action.payload;
        }, 
    }
})