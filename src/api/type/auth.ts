export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

export type SignUpResponse = AuthResponse;
