import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import likesReducer from './slices/likesSlice';
import dislikesReducer from './slices/dislikesSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    likes: likesReducer,
    dislikes: dislikesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;