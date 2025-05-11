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
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
