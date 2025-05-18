import { Reaction } from './reactions.ts';
import { UserWithUsername } from './users.ts';
import { CommentResponse } from './comments.ts';

export enum PostStatusEnum {
  VALID = 'valid',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

export interface PostListResponse {
  comments: any;
  id: number;
  title: string;
  status: PostStatusEnum;
  reactions: Reaction[];
  created_at: string;
  updated_at: string;
}

export interface PostListResponseWithComments extends PostListResponse {
  comments: CommentResponse[];
}

export interface PostResponse extends PostListResponse {
  user: UserWithUsername;
  comments: CommentResponse[];
}

export interface PostUpdateCreate {
  title?: string;
  content?: string;
}
