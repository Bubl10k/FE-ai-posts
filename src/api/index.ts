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

export const POSTS = {
  base: () => `posts`,
  byId: (id: number) => `posts/${id}`,
  getUserPosts: (userId: number) => `posts/user/${userId}`,
  createPostReaction: (postId: number) => `posts/${postId}/reactions`,
  search: (query: string) => `posts/search?search_query=${query}`,
};