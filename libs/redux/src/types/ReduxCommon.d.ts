import { Action, Reducer } from 'redux';

export interface ReduxAction<P, T = string> extends Action {
  type: T;
  payload: P;
}

export type ReduxReducer<P, T = string> = Reducer<P, ReduxAction<P, T>>;

export interface SagaGeneratorAction<P, T = string> {
  type: T;
  payload: P;
}
