import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  CreateResponseToComment,
  ResponseToCommentResponse,
} from '../type/commentReponses.ts';
import { COMMENTS } from '../index.ts';

export const apiCommentResponses = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    createCommentResponse: builder.mutation<
      ResponseToCommentResponse,
      CreateResponseToComment & { commentId: number | string }
    >({
      query: commentResponse => ({
        url: COMMENTS.createCommentResponse(commentResponse.commentId),
        method: 'POST',
        body: {
          content: commentResponse.content,
        },
      }),
    }),
    deleteCommentResponseById: builder.mutation<void, number>({
      query: id => ({
        url: COMMENTS.createCommentResponse(id),
        method: 'DELETE',
      }),
    }),
  }),
};
