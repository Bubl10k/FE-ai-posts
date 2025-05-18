export interface User {
  id: number;
  email: string;
}

export interface UserWithUsername extends User {
  username: string;
}
