import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '@shared/config';
import { storage } from '@shared/lib/storage';

const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getString('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      storage.delete('accessToken');
      storage.delete('refreshToken');
    }
    return Promise.reject(error);
  },
);

export { httpClient };
