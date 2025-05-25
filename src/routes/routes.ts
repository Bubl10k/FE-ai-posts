export const ROUTES = {
  root: '/',
  login: '/login',
  signup: '/signup',
  profile: (id: string | number) => `/profile/${id}`,
  profilePath: '/profile/:id',
  profileEdit: '/profile/edit',
  postCreate: '/post/create',
  postEditPath: '/post/edit/:id',
  postEdit: (id: string | number) => `/post/edit/${id}`,
  postDetailPath: '/post/:id',
  postDetail: (id: string | number) => `/post/${id}`,
  dashboard: '/dashboard',
};
