import globalInitialState from './initialState';
import { GlobalActions } from './actionType';
import { ReduxReducer } from '../types/ReduxCommon';
import { GlobalInitialState } from './types';

const globalReducer: ReduxReducer<GlobalInitialState, GlobalActions> = (
  state = globalInitialState,
  action,
): GlobalInitialState => {
  switch (action.type) {
    case GlobalActions.SET_TOAST: {
      return state;
    }
    case GlobalActions.LOAD_USER: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case GlobalActions.SET_AUTH_STATUS: {
      return {
        ...state,
        authStatus: action.payload.authStatus,
      };
    }
    default:
      return state;
  }
};

export default globalReducer;
