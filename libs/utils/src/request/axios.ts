// import { LoggerAuthData } from '@utils/Logger';
import axios, { AxiosRequestConfig } from 'axios';
import { CANCEL } from 'redux-saga';

export const ApiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});


export interface TSuccess<T> {
  code?: string;
  message?: string;
  data?: T;
}

export type NetworkResponse<T> = {
  readonly status: boolean;
  readonly error?: TSuccess<T>;
  readonly success?: TSuccess<T>;
  readonly data?: any;
  readonly message: string;
};

export type NetworkResponseForDash<T> = {
  readonly status: number;
  readonly message?: string;
  readonly error?: TSuccess<T>;
  readonly success?: TSuccess<T>;
  readonly data?: any;
};

export interface RequestConfig<U> extends AxiosRequestConfig {
  data?: U;
}

export function sagaCancelRequest<T, U = any>(
  url: string,
  config: RequestConfig<U>,
): Promise<NetworkResponse<T>> {
  const controller = new AbortController();
  config.signal = controller.signal;
  const { data, ...restConfig } = config;
  const promise = ApiAxios<NetworkResponse<T>>(url, {
    ...restConfig,
    data: { data },
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise[CANCEL] = () => controller.abort();
  return promise.then((resp) => resp.data);
}

export function setAxiosBasicInfo(type: 'TOKEN', value: string) {
  const headerType =
    type === 'TOKEN'
      ? 'authorization'
      : 'empty';
  ApiAxios.defaults.headers[headerType] = value;
}
