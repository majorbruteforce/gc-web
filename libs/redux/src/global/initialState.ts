import { GlobalInitialState } from './types';


const globalInitialState: GlobalInitialState = {
  error: false,
  errorMessage: '',
  loading: false,
  user: null,
  authStatus: 'pending',
};

export default globalInitialState;
