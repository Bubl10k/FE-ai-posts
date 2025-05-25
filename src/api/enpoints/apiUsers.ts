import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { USERS } from '../index.ts';
import { UserResponse, UserUpdate } from '../type/users.ts';

export const apiUsers = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    uploadUserAvatar: builder.mutation<
      void,
      { userId: number | string; formData: FormData }
    >({
      query: ({ userId, formData }) => ({
        url: USERS.byId(userId),
        method: 'POST',
        body: formData,
      }),
    }),
    updateUser: builder.mutation<UserResponse, UserUpdate>({
      query: user => ({
        url: USERS.byId(user.id),
        method: 'PUT',
        body: user,
      }),
    }),
    getUserById: builder.query<UserResponse, number | string>({
      query: id => ({
        url: USERS.byId(id),
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query<UserResponse[], any>({
      query: () => ({
        url: USERS.base(),
        method: 'GET',
      }),
    }),
    followUser: builder.mutation<
      void,
      { userId: number | string; followId: number | string }
    >({
      query: ({ userId: userId, followId: followId }) => ({
        url: USERS.follow(userId, followId),
        method: 'POST',
      }),
    }),
    unFollowUser: builder.mutation<
      void,
      { userId: number | string; unfollowId: number | string }
    >({
      query: ({ userId: userId, unfollowId: followId }) => ({
        url: USERS.unfollow(userId, followId),
        method: 'POST',
      }),
    }),
  }),
};
