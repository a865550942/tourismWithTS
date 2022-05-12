import { createStore, combineReducers, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middleWare/actionLog';
import { actionLanguage } from './middleWare/actionLaguage';
const rootReducer = combineReducers({
    languageReducer,
    recommendProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk,actionLog, actionLanguage));

// ReturnType为之前存疑点，该操作得到函数的输出类型
export type RootState = ReturnType<typeof store.getState>

export default store;