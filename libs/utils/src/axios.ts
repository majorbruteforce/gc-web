import axios, { AxiosRequestConfig } from 'axios';

// import { HOST_API } from 'src/config-global';
import Cookies from "universal-cookie";

// ----------------------------------------------------------------------

export const TOKEN_STORAGE_KEY = '_cc_tk';
export const cookieStorage = new Cookies();

const axiosInstance = axios.create({ baseURL: '' });

axiosInstance.interceptors.request.use((req) => {
  const access_token: string = cookieStorage.get(TOKEN_STORAGE_KEY);
  if (access_token) {
    // @ts-ignore
    req.headers = {
      ...req.headers,
      'Authorization': `Bearer ${access_token}`,
    }
  }
  return req
})

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  authentication: '/authentication',
  verify: '/authentication/verify',

  // old paths
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
