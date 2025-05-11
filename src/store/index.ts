import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { BaseApi } from '../api/_base.api.ts';
import authReducer from './slices/authReducer.ts';

const rootReducer = combineReducers({
  [BaseApi.reducerPath]: BaseApi.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(BaseApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
