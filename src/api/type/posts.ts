import { Reaction } from './reactions.ts';
import { User, UserWithUsername } from './users.ts';
import { CommentResponse, CommentResponseWithUser } from './comments.ts';

export enum PostStatusEnum {
  VALID = 'valid',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

export interface PostListResponse {
  comments: any;
  id: number | string;
  title: string;
  status: PostStatusEnum;
  reactions: Reaction[];
  created_at: string;
  updated_at: string;
}

export interface PostListResponseWithComments extends PostListResponse {
  comments: CommentResponse[];
}

export interface PostListResponseWithUserComments extends PostListResponse {
  comments: CommentResponseWithUser[];
}

export interface PostListResponseWithUser
  extends PostListResponseWithUserComments {
  user: User;
}

export interface PostDetailsResponse extends PostListResponseWithUser {
  user: UserWithUsername;
  comments: CommentResponseWithUser[];
  content: string;
}

export interface PostResponse extends PostListResponse {
  user: UserWithUsername;
  comments: CommentResponse[];
  content: string;
}

export interface PostUpdateCreate {
  title?: string;
  content?: string;
}
