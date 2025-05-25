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

export const USERS = {
  base: () => `users`,
  byId: (id: number | string) => `users/${id}`,
  follow: (userId: number | string, followId: number | string) =>
    `users/${userId}/follow/${followId}`,
  unfollow: (id: number | string, followId: number | string) =>
    `users/${id}/unfollow/${followId}`,
};

export const POSTS = {
  base: () => `posts`,
  byId: (id: number | string) => `posts/${id}`,
  getUserPosts: (userId: number | string) => `posts/user/${userId}`,
  createPostReaction: (postId: number) => `posts/${postId}/reactions`,
  search: (query: string) => `posts/search?search_query=${query}`,
};

export const COMMENTS = {
  base: () => `comments`,
  byId: (postId: number) => `comments/${postId}`,

  createCommentResponse: (commentId: number | string) =>
    `comments/${commentId}/responses`,
};

export const REACTIONS = {
  base: (postId: number) => `posts/${postId}/reactions`,
  byId: (postId: number, reactionId: number) =>
    `posts/${postId}/reactions/${reactionId}`,
};
