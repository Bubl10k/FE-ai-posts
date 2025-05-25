import { BaseApi } from './_base.api.ts';
import { apiAuth } from './enpoints/apiAuth.ts';
import { apiPosts } from './enpoints/apiPosts.ts';
import { apiComments } from './enpoints/apiComments.ts';
import { apiCommentResponses } from './enpoints/apiCommentResponses.ts';
import { apiReactions } from './enpoints/apiReactions.ts';
import { apiUsers } from './enpoints/apiUsers.ts';

const extendedApi = BaseApi.injectEndpoints(apiAuth)
  .injectEndpoints(apiUsers)
  .injectEndpoints(apiPosts)
  .injectEndpoints(apiComments)
  .injectEndpoints(apiCommentResponses)
  .injectEndpoints(apiReactions);

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
  useDeletePostByIdMutation,
  useCreateCommentMutation,
  useDeleteCommentByIdMutation,
  useUpdateCommentByIdMutation,
  useCreateCommentResponseMutation,
  useDeleteCommentResponseByIdMutation,
  useCreatePostReactionMutation,
  useDeletePostReactionByIdMutation,
  useUpdatePostReactionByIdMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUploadUserAvatarMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
} = extendedApi;
