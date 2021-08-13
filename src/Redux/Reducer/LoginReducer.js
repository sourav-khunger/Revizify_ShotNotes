import {combineReducers} from 'redux';

import loginKeys from '../constants/LoginKeys';

const INITIAL_STATE = {
  login: '',
};

export const saveLoginInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SAVE_LOGIN':
      return {
        ...(state || {}),
        login: action.payload,
      };

    // case loginKeys.SAVE_SOCIAL_LOGIN:
    //   return {
    //     ...state,
    //     socialLogin: action.payload,
    //     isLoader: false
    //   };
    //   case loginKeys.SAVE_PAYMENT:
    //   return {
    //     ...state,
    //     payment: action.payload,
    //     isLoader: false
    //   };

    //   case commonKeys.API_FAILED:
    //   return { ...state, isLoader: false, authError: { data: '' }, };
    case loginKeys.ERROR:
      return {
        ...state,
        authError: action.payload,
        isLoader: false,
      };

    default:
      return state;
  }
};
export default combineReducers({
  loginInfo: saveLoginInfo,
});
