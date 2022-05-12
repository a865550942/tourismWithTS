import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';
// 表示正在调用api
export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START';
// api调用成功
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS';
// api调用失败
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL';

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any,
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any
}

export type RecommendProductsAction = 
    FetchRecommendProductsFailAction 
    | FetchRecommendProductsStartAction 
    | FetchRecommendProductsSuccessAction;


export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const FetchRecommendProductsSuccessActionCreator = (data): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const FetchRecommendProductsFailActionCreator = (error): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}
// 返回一个函数，thunk作用让dispatch多支持了一种类型（函数）
export const giveMeDataActionCreator = () : ThunkAction<
    void, 
    RootState, 
    unknown, 
    RecommendProductsAction
> => async (dispatch, getState) => {
    dispatch(fetchRecommendProductsStartActionCreator());
    try {
      const { data } = await axios.get(
        "http://123.56.149.216:8080/api/productCollections"
      );
      dispatch(FetchRecommendProductsSuccessActionCreator(data));
    } catch (error: any) {
      dispatch(FetchRecommendProductsFailActionCreator(error.message));
    }
}
// 类型参数1： ReturnType 用于指定函数的返回值类型 void
// 类型参数2： 指定RootState的类型
// 类型参数3： 指定额外的参数类型，一般为unkonwn或者any
// 类型参数4： 用于指定dispatch的Action类型