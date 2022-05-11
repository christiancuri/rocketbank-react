import { getModule, postModule } from '../client';
import { TUserInfo } from './user.types';

export async function getUserInfo() {
  return getModule<TUserInfo>('/user');
}

export async function signIn({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  return postModule<{ accessToken: string; user: TUserInfo }>('/system/login', {
    email,
    password
  });
}

export async function signUp({
  name,
  email,
  password
}: {
  name: string;
  email: string;
  password: string;
}) {
  return postModule<{ accessToken: string; user: TUserInfo }>(
    '/system/register',
    {
      name,
      email,
      password
    }
  );
}

export * as UserRequests from './index';
