import { BaseApi } from './_base.api.ts';
import { apiAuth } from './enpoints/apiAuth.ts';
import { apiPosts } from './enpoints/apiPosts.ts';

const extendedApi = BaseApi.injectEndpoints(apiAuth).injectEndpoints(apiPosts);

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useGetCurrentUserQuery,
  useGetPostsQuery,
  useCreatePostMutation,
  useGetPostByIdQuery,
  useGetUserPostsQuery,
  useSearchPostsQuery,
  useUpdatePostMutation,
} = extendedApi;
