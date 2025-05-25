import { User } from './users.ts';

export interface ResponseToCommentResponse {
  id: number;
  user: User;
  comment_id: number;
  created_at: string;
  updated_at: string;
  content: string;
}

export interface CreateResponseToComment {
  content: string;
}
