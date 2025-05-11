export const AUTH = {
  login: () => `auth/login`,
  signUp: () => `auth/register`,
  getCurrentUser: () => `auth/me`,
  logout: () => `auth/logout`,
  refreshToken: (refreshToken: string) => {
    return {
      url: `/auth/refresh?refresh_token=${refreshToken}`,
      method: 'POST',
    };
  },
};
