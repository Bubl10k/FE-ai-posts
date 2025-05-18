import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { POSTS } from '../index.ts';
import {
  PostListResponse,
  PostListResponseWithComments,
  PostResponse,
  PostUpdateCreate,
} from '../type/posts.ts';

export const apiPosts = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getPosts: builder.query<PostListResponse[], any>({
      query: () => ({
        url: POSTS.base(),
        method: 'GET',
      }),
    }),
    getPostById: builder.query<PostResponse, PostResponse['id']>({
      query: id => ({
        url: POSTS.byId(id),
        method: 'GET',
      }),
    }),
    getUserPosts: builder.query<
      PostListResponseWithComments[],
      PostListResponse['id']
    >({
      query: id => ({
        url: POSTS.getUserPosts(id),
        method: 'GET',
      }),
    }),
    searchPosts: builder.query<PostListResponse[], string>({
      query: title => ({
        url: POSTS.search(title),
        method: 'GET',
      }),
    }),
    createPost: builder.mutation<PostResponse, PostUpdateCreate>({
      query: post => ({
        url: POSTS.base(),
        method: 'POST',
        body: post,
      }),
    }),
    updatePost: builder.mutation<
      PostResponse,
      PostUpdateCreate & { id: number }
    >({
      query: post => ({
        url: POSTS.byId(post.id),
        method: 'PUT',
        body: post,
      }),
    }),
  }),
};
