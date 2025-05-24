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
