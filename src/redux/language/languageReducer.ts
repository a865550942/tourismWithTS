import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from './languageActions';

export interface languageState {
    language: 'en' | 'zh',
    languageList: {name: string, code: string}[]
}

const defaultState: languageState = {
    language: 'zh',
    languageList: [
        {name: '中文', code: 'zh'},
        {name: 'Engilish', code: 'en'}
    ]
}

// 引入 LanguageActionTypes后能保证action.xx不会出错，同时在不同的case中能动态的对payload具体类型进行要求
export default (state = defaultState, action: LanguageActionTypes) => {
    switch(action.type) {
        case CHANGE_LANGUAGE:
            // 在这里调用会导致该reducer不是纯函数
            // i18n.changeLanguage(action.payload)
            return {...state, language: action.payload };
        case ADD_LANGUAGE:
            return { ...state, languageList:[...state.languageList, action.payload]};
        default:
            return state
    }
}