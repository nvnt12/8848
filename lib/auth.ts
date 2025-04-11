import { mockUser } from './mock-data';
import { User } from './types';

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('user') !== null;
};

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    if (email === 'john.doe@example.com' && password === 'password') {
      const user = mockUser;
      localStorage.setItem('user', JSON.stringify(user));
      resolve(user);
    } else {
      reject(new Error('Invalid credentials'));
    }
  });
};

export const logout = (): void => {
  localStorage.removeItem('user');
};