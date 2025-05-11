import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector.ts';
import { Navigate } from 'react-router-dom';

type GuestGuardProps = {
  children: React.ReactNode;
};

const GuestGuard = ({ children }: GuestGuardProps) => {
  const { user } = useTypedSelector(state => state.auth);

  // if (!isInit) {
  //   return <LoadingScreen />;
  // }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
export default GuestGuard;
