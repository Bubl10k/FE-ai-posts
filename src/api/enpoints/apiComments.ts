import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { COMMENTS } from '../index.ts';
import { CommentResponse, CommentUpdateCreate } from '../type/comments.ts';
import { PostUpdateCreate } from '../type/posts.ts';

export const apiComments = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    createComment: builder.mutation<
      CommentResponse,
      CommentUpdateCreate & { postId: number }
    >({
      query: comment => ({
        url: COMMENTS.byId(comment.postId),
        method: 'POST',
        body: {
          content: comment.content,
        },
      }),
    }),
    updateCommentById: builder.mutation<
      CommentResponse,
      PostUpdateCreate & { id: number }
    >({
      query: comment => ({
        url: COMMENTS.byId(comment.id),
        method: 'PUT',
        body: comment,
      }),
    }),
    deleteCommentById: builder.mutation<void, number>({
      query: id => ({
        url: COMMENTS.byId(id),
        method: 'DELETE',
      }),
    }),
  }),
};
