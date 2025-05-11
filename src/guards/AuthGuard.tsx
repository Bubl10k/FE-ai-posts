import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector.ts';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes.ts';

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user } = useTypedSelector(state => state.auth);

  // if (!isInit) {
  //   return <LoadingScreen />;
  // }

  if (!user) {
    return <Navigate to={ROUTES.login} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
