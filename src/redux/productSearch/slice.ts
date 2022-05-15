import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
interface ProductSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    pagination: any;
}
const initialState : ProductSearchState= {
    loading: true,
    error: null,
    data: null,
    pagination: null
}

export const searchProduct = createAsyncThunk(
    // 分别来自于slice的name以及本action的名字 
    // 前面是命名空间，后面是当前的action
    'productSearch/searchProduct',
    async (parameters:{
        keywords: string,
        nextPage: number | string,
        pageSize: number | string
    }, thunkAPI) => {
        let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`
        if(parameters.keywords) {
            url += `&keyword=${parameters.keywords}`; 
        }
        const  response  = await axios.get(url);
        // 这里的return是下面的action.payload
        return {
            data: response.data,
            pagination: JSON.parse(response.headers['x-pagination']) 
        }; 
   }
)

export const productSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    reducers: {
    },
    extraReducers:{
        // 相当于fetchStart
        [searchProduct.pending.type]: (state) => {
            // return {...state, loading: true};
            // react-toolkit中有了immer后可以如下写法,其会将代码在底层转成immutable的
            state.loading = true;
        },
        // action类型已经提前被Redux-toolkit提前定义好,但也可以手动使用PayloadAction
        // (parameter) ation: {
        //     payload: any;
        //     type: string;
        // }
        [searchProduct.fulfilled.type]: (state, action) => {
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        } 
    }

})