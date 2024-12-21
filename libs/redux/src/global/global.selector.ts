import {StoreState} from '../store';

export const getUserInfo = (state: StoreState) => state.global.user;

export const getAuthStatus = (state: StoreState) => state.global.authStatus;
