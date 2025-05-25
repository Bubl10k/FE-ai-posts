export interface User {
  id: number;
  email: string;
  username: string;
  avatar?: string;
  about?: string;
}

export interface UserWithUsername extends User {
  username: string;
}

export interface UserResponse {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  username: string;
  avatar: string;
  about: string;
  followers: User[];
}

export interface UserUpdate {
  id: number;
  username: string;
  email: string;
  about: string;
}
