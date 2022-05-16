import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ShoppingCartState {
    loading: boolean,
    error: string | null,
    items: any[]
}

const initialState: ShoppingCartState = {
    loading: false,
    error: null,
    items: []
}

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
   async (jwt: string, thunkAPI) => {
       const { data } = await axios.get(
           'http://123.56.149.216:8080/api/shoppingCart',
           {
               headers:{
                   Authorization: `bearer${jwt}`
               }
           }
       )
       return data.shoppingCartItems;
   }
)

export const addShoppingCartItem = createAsyncThunk(
    'shoppingCart/addShoppingCartItem',
    async (params: {touristRouteId: string, jwt: string}, thunkAPI) => {
        const { data } = await axios.post('http://123.56.149.216:8080/api/shoppingCart/items',
        {
            touristRouteId: params.touristRouteId,
        },
        {
            headers: {
                Authorization:  `bearer ${params.jwt}`
            },
        })
        return data.shoppingCartItems;
    }
);

export const clearShoppingCartItem = createAsyncThunk(
    'shoppingCart/clearShoppingCart',
   async (params:{jwt: string, itemIds: number[]}, thunkAPI) => {
       console.log("打印删除购物车参数",params)
        // 由于返回是204没有content，所以直接将axios调用返回即可
        return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${params.itemIds.join(",")})`,{
            headers: {
                Authorization: `bearer ${params.jwt}`
            }
        })
   }
)

export const checkout = createAsyncThunk(
    'shoppingCart/checkout',
   async (jwt: string, thunkAPI) => {
        // 由于返回是204没有content，所以直接将axios调用返回即可
        const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`,
        null,
        {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        });
        return data;
   }
)

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers:{},
    extraReducers:{
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, actions) => {
            state.error = null;
            state.loading = false;
            state.items = actions.payload;
        },
        [getShoppingCart.rejected.type]: (state, actions: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = actions.payload;
        },

        [addShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, actions) => {
            state.error = null;
            state.loading = false;
            state.items = actions.payload;
        },
        [addShoppingCartItem.rejected.type]: (state, actions: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = actions.payload;
        },

        [clearShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state) => {
            state.error = null;
            state.loading = false;
            state.items = [];
        },
        [clearShoppingCartItem.rejected.type]: (state, actions: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = actions.payload;
        },

        [checkout.pending.type]: (state) => {
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state) => {
            state.error = null;
            state.loading = false;
            state.items = [];
        },
        [checkout.rejected.type]: (state, actions: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = actions.payload;
        },
    }
})