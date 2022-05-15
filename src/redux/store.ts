import { createStore, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import { actionLog } from './middleWare/actionLog';
import { actionLanguage } from './middleWare/actionLaguage';
import { productSearchSlice } from './productSearch/slice';
import { userSlice } from './user/slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// 使用redux-toolkit优势在于actions不再需要人为去写减少代码量并使代码整洁
// 同时reducer中不再需要通过switch来逐个判断action
import { productDetailSlice } from './productDetail/slice';
// toolkit中的combineReducers与redux中的区别在于toolkit中的支持slice中的reducer
import { combineReducers, configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { shoppingCartSlice} from './shoppingCart/slice'

const persistConfig = {
    key: 'root',
    storage,
    // 白名单,这里的user指向的是rootReducer中的user，会将redux
    // 中user部分数据默认以localstorage（引入storage默认）的形式保存起来
    whiteList:['user']
    // 同一时间只需黑白名单中的一个，或者全都不要
}

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer

})
const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, applyMiddleware(thunk,actionLog, actionLanguage));
const store = configureStore({
    // 由于使用了persistedReducer包裹后相当于再rootReducer上又封装了一层
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => [
        // RTK中原有的中间件进行解析
        ...getDefaultMiddleWare(),
        actionLog,
        actionLanguage
    ],
    // 可以打开redux devtools
    devTools: false 
})

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = ReturnType<typeof store.dispatch>

export default { store, persistor };
