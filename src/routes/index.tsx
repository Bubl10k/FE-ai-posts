import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './routes.ts';
import { ElementType, lazy, Suspense } from 'react';
import LoadingScreen from '../components/LoadingScreen.tsx';
import AuthGuard from '../guards/AuthGuard.tsx';
import GuestGuard from '../guards/GuestGuard.tsx';

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const LoginPage = Loadable(lazy(() => import('../pagescomponents/Auth/Login')));
const SignupPage = Loadable(
  lazy(() => import('../pagescomponents/Auth/Signup')),
);
const PostListPage = Loadable(
  lazy(() => import('../pagescomponents/PostList')),
);
const PostDetailPage = Loadable(
  lazy(() => import('../pagescomponents/PostDetailPage')),
);
const ProfilePage = Loadable(lazy(() => import('../pagescomponents/Profile')));
const PostCreateEditPage = Loadable(
  lazy(() => import('../pagescomponents/PostCreateEdit')),
);
const DashboardPage = Loadable(
  lazy(() => import('../pagescomponents/Dashboard')),
);
const EditProfilePage = Loadable(
  lazy(() => import('../pagescomponents/Profile/EditProfilePage')),
);

const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: (
      <AuthGuard>
        <PostListPage />
      </AuthGuard>
    ),
  },

  {
    path: ROUTES.login,
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: ROUTES.signup,
    element: (
      <GuestGuard>
        <SignupPage />
      </GuestGuard>
    ),
  },
  {
    path: ROUTES.profilePath,
    element: (
      <AuthGuard>
        <ProfilePage />
      </AuthGuard>
    ),
  },
  {
    path: ROUTES.profileEdit,
    element: (
      <AuthGuard>
        <EditProfilePage />
      </AuthGuard>
    ),
  },
  {
    path: ROUTES.postCreate,
    element: (
      <AuthGuard>
        <PostCreateEditPage />
      </AuthGuard>
    ),
  },
  {
    path: ROUTES.postEditPath,
    element: (
      <AuthGuard>
        <PostCreateEditPage />
      </AuthGuard>
    ),
  },
  {
    path: ROUTES.dashboard,
    element: (
      <AuthGuard>
        <DashboardPage />
      </AuthGuard>
    ),
  },
  {
    path: ROUTES.postDetailPath,
    element: (
      <AuthGuard>
        <PostDetailPage />
      </AuthGuard>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
