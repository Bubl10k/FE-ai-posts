export type User = {
  id: number;
  email: string;
};

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  about?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
};
