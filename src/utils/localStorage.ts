import { User } from '../types/users.ts';

const setItemToStorage = (key: string, object: any) => {
  const data = JSON.stringify(object);

  if (data) {
    return localStorage.setItem(key, data);
  } else {
    return false;
  }
};

const getItemFromStorage = (key: string) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
};

const removeItemFromStorage = (key: string) => localStorage.removeItem(key);

export const localStorageService = {
  getAccessToken: () => getItemFromStorage('accessToken'),
  setAccessToken: (token: string) => setItemToStorage('accessToken', token),
  removeAccessToken: () => removeItemFromStorage('accessToken'),

  getRefreshToken: () => getItemFromStorage('refreshToken'),
  setRefreshToken: (token: string) => setItemToStorage('refreshToken', token),
  removeRefreshToken: () => removeItemFromStorage('refreshToken'),

  getUser: () => getItemFromStorage('user'),
  setUser: (user: User) => setItemToStorage('user', user),
  removeUser: () => removeItemFromStorage('user'),

  clear: () => localStorage.clear(),
};
