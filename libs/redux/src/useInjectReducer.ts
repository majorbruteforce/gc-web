import { combineReducers, Reducer } from 'redux';
import store from './store';
import { useEffect } from 'react';
import rootReducer from './rootReducer';

declare type InjectReducer = (key: string, saga: Reducer) => () => void;

const createReducerInject = () => {
  const injectedReducers: {
    [key: string]: Reducer<any, any>;
  } = {
    ...rootReducer,
  };

  const injectReducer: InjectReducer = (key, reducer) => {
    const isInjected = Boolean(injectedReducers[key]);

    if (!isInjected) {
      injectedReducers[key] = reducer;

      store.replaceReducer(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        combineReducers(injectedReducers),
      );
    }

    return () => {
      const isInjected = Boolean(injectedReducers[key]);
      if (isInjected) {
        delete injectedReducers[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store.replaceReducer(combineReducers(injectedReducers));
      }
    };
  };

  return injectReducer;
};

export const injectReducer: InjectReducer = createReducerInject();

const useInjectReducer = (key: string, reducer: Reducer<any, any>) => {
  useEffect(() => {
    const removeReducer = injectReducer(key, reducer);
    return () => {
      removeReducer();
    };
  }, []);
};

export default useInjectReducer;
