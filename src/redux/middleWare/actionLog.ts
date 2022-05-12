import { Middleware } from 'redux';
export const actionLog : Middleware = (store) => (next) => (action) => {
    console.log("state 当前", store.getState());
    console.log("first action", action);
    // 用next将action分发出去
    next(action);
    console.log("store 更新", store.getState());
}