// Types
import * as types from './types';

const initialState = {
  isOnline: navigator.onLine,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ONLINE_STATUS:
      return {
        ...state,
        isOnline: action.payload,
      };

    default:
      return state;
  }
};
