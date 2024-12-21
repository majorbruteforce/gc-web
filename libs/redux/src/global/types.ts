import {User} from "../types/User";


export type GlobalInitialState = {
  authStatus: 'pending' | 'unauthorized' | 'success';
  user: User | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};
