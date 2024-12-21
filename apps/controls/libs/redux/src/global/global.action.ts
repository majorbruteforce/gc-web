import { GlobalActions } from './actionType';
import { GlobalInitialState } from "./types";
import { User } from "../types/User";

export function setUserInfo(user: User) {
  return { type: GlobalActions.LOAD_USER, payload: { user } };
}

export function setToast(toast: any) {
  return { type: GlobalActions.SET_TOAST, payload: { toast } };
}

export function validateUserToken() {
  return { type: GlobalActions.VALIDATE_USER_TOKEN };
}

export function setAuthStatus(authStatus: GlobalInitialState['authStatus']) {
  return { type: GlobalActions.SET_AUTH_STATUS, payload: { authStatus } };
}
