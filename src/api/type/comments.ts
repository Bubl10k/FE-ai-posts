import { User } from './users.ts';

export interface CommentResponse {
  id: number;
  content: string;
  post_id: number;
  created_at: string;
  updated_at: string;
}

export interface CommentResponseWithUser extends CommentResponse {
  user: User;
}
