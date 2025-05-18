import { UserProfile } from '../../types/users.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageService } from '../../utils/localStorage.ts';

export type AuthState = {
  token?: string;
  refreshToken?: string;
  user?: UserProfile;
  isInit?: boolean;
};

const initialState: AuthState = {
  token: undefined,
  refreshToken: undefined,
  user: undefined,
  isInit: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: state => {
      state.user = localStorageService.getUser();
      state.token = undefined;
      state.refreshToken = undefined;
    },
    setUser: (state, action: PayloadAction<UserProfile | undefined>) => {
      state.user = action.payload;
    },
    initAuth: (state, action: PayloadAction<UserProfile | undefined>) => {
      state.isInit = true;
      state.user = action.payload;
    },
  },
});

export const { logoutUser, setUser, initAuth } = authSlice.actions;

export default authSlice.reducer;
