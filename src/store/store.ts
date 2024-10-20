import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    usersState: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
