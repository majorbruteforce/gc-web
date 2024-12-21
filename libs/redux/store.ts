import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { combineReducers } from 'redux';
import { injectSaga, sagaMiddleware } from './useInjectSaga';
import rootSaga from './rootSaga';

const allReducer = combineReducers(rootReducer);

const store = configureStore({
    reducer: allReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

injectSaga('root', rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type StoreState<Key = string, Reducer = Record<string, any>> = ReturnType<typeof allReducer> &
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Record<Key, Reducer>;

export type StoreStateDynamic<T> = ReturnType<typeof allReducer> & Partial<T>;

export default store;
