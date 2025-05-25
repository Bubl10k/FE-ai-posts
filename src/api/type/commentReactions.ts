export enum ReactionsEnum {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

export interface CommentReactionsCreate {
  reaction: ReactionsEnum;
}

export interface CommentReactionsResponse {
  reaction: ReactionsEnum;
  uuid: string;
  user_id: number;
  post_id: number;
}
