import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}
const initialState : ProductDetailState= {
    loading: true,
    error: null,
    data: null
}

export const getProductDetail = createAsyncThunk(
    // 分别来自于slice的name以及本action的名字
    'productDetail/getProductDetail',
    async (touristRouteId: string, thunkAPI) => {
        const { data } = await axios.get(
          `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );
        return data; 
   }
)

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
    },
    extraReducers:{
        // 相当于fetchStart
        [getProductDetail.pending.type]: (state) => {
            // return {...state, loading: true};
            // react-toolkit中有了immer后可以如下写法,其会将代码在底层转成immutable的
            state.loading = true;
        },
        // action类型已经提前被Redux-toolkit提前定义好,但也可以手动使用PayloadAction
        // (parameter) ation: {
        //     payload: any;
        //     type: string;
        // }
        [getProductDetail.fulfilled.type]: (state, action: PayloadAction<string | null>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        } 
    }

})