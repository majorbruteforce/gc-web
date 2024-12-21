"use client";

import { useEffect, useState } from 'react';
import createSagaMiddleware, { Saga, Task } from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

declare type InjectSaga = (key: string, saga: Saga) => () => void;

const createSagaInjector = () => {
  const injectedSaga = new Map<string, Task>();

  const injectSaga: InjectSaga = (key, saga) => {
    const isInjected = injectedSaga.has(key);

    if (!isInjected) {
      injectedSaga.set(key, sagaMiddleware.run(saga));
    }

    return () => {
      const task = injectedSaga.get(key);
      if (task && !task.isCancelled()) task.cancel();
      injectedSaga.delete(key);
    };
  };

  return injectSaga;
};

export const injectSaga: InjectSaga = createSagaInjector();

export const useInjectSaga = (key: string, saga: Saga) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const removeSaga = injectSaga(key, saga);
    setIsLoaded(true);
    return () => {
      removeSaga();
    };
  }, []);
  return isLoaded;
};
