import { BaseApi } from './_base.api.ts';
import { apiAuth } from './enpoints/apiAuth.ts';

const extendedApi = BaseApi.injectEndpoints(apiAuth);

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useGetCurrentUserQuery,
} = extendedApi;
