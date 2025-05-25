import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { REACTIONS } from '../index.ts';
import {
  CommentReactionsCreate,
  CommentReactionsResponse,
} from '../type/commentReactions.ts';

export const apiReactions = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    createPostReaction: builder.mutation<
      CommentReactionsResponse,
      CommentReactionsCreate & { postId: number }
    >({
      query: commentReaction => ({
        url: REACTIONS.base(commentReaction.postId),
        method: 'POST',
      }),
    }),
    updatePostReactionById: builder.mutation<
      CommentReactionsResponse,
      CommentReactionsCreate & { postId: number; reactionId: number }
    >({
      query: commentReaction => ({
        url: REACTIONS.byId(commentReaction.postId, commentReaction.reactionId),
        method: 'PUT',
      }),
    }),
    deletePostReactionById: builder.mutation<
      void,
      { postId: number; reactionId: number }
    >({
      query: ({ postId, reactionId: id }) => ({
        url: REACTIONS.byId(postId, id),
        method: 'DELETE',
      }),
    }),
  }),
};
