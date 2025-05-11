import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  AuthRequest,
  AuthResponse,
  SignUpResponse,
  User,
} from '../type/auth.ts';
import { AUTH } from '../index.ts';

export const apiAuth = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials: AuthRequest) => ({
        url: AUTH.login(),
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: AUTH.logout(),
        method: 'POST',
      }),
    }),
    signUp: builder.mutation<SignUpResponse, AuthRequest>({
      query: (credentials: AuthRequest) => ({
        url: AUTH.signUp(),
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query<User, any>({
      query: () => ({
        url: AUTH.getCurrentUser(),
        method: 'GET',
      }),
    }),
  }),
};
