import axios from 'axios';

import { Session } from './Session';

const baseURL = process.env.REACT_APP_API_ENDPOINT;

export const apiClient = axios.create({
  baseURL
});

apiClient.interceptors.request.use((config) => {
  const nConfig = { ...config };
  const accessToken = Session.getSessionToken();
  if (accessToken) {
    nConfig.headers.Authorization = accessToken;
  }
  return nConfig;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const path = window.location.pathname;
    const status = error.status || error.response.status;
    if (error && path !== '/login' && status === 401) {
      Session.clearSession();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export async function getModule<T>(url: string, config = {}): Promise<T> {
  return apiClient.get<T>(url, config) as any;
}

export async function putModule<T>(
  url: string,
  data: Record<string, any>
): Promise<T> {
  return apiClient.put<T>(url, data) as any;
}

export async function postModule<T>(
  url: string,
  data: Record<string, any>
): Promise<T> {
  return apiClient.post<T>(url, data) as any;
}

export async function deleteModule<T>(url: string): Promise<T> {
  return apiClient.delete<T>(url) as any;
}

export async function patchModule<T>(
  url: string,
  data: Record<string, any>
): Promise<T> {
  return apiClient.patch<T>(url, data) as any;
}
