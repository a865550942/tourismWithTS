import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from './store';
// 解决在外使用useSelector时需要重复写类型的问题
export const useSelector : TypedUseSelectorHook<RootState> = useReduxSelector;