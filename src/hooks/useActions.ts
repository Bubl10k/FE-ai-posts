import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { logoutUser, setUser, initAuth } from '../store/slices/authReducer.ts';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators({ logoutUser, setUser, initAuth }, dispatch),
    [dispatch],
  );
};
