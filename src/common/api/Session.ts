const STORAGE_KEY = 'accessToken';

export function setSession(token: string) {
  localStorage.setItem(STORAGE_KEY, token);
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getSessionToken() {
  return localStorage.getItem(STORAGE_KEY);
}

export * as Session from './Session';
