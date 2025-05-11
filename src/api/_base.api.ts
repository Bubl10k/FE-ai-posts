import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../config/env.config.ts';
import { localStorageService } from '../utils/localStorage.ts';
import { AUTH } from './index.ts';
import { logoutUser } from '../store/slices/authReducer.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_API_URL}`,
  prepareHeaders: headers => {
    const token = localStorageService.getAccessToken();

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    const refreshToken = localStorageService.getRefreshToken();

    if (refreshToken) {
      const refreshResult = await baseQuery(
        AUTH.refreshToken(refreshToken),
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        localStorageService.setAccessToken(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (refreshResult.data as any).access_token,
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logoutUser());
        localStorageService.removeAccessToken();
        localStorageService.removeRefreshToken();
        localStorageService.removeUser();
      }
    }
  }

  return result;
};

export const BaseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
