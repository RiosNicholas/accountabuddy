import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikesState {
  likes: string[];
}

const initialState: LikesState = {
  likes: [], // start as an empty list
}

const authSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    addToRecentLikes: (state, action: PayloadAction<string>) => {
      state.likes.push(action.payload);
    },
    clearRecentLikes: (state) => {
      state.likes = [];
    },
  },
});

export const { addToRecentLikes, clearRecentLikes } = authSlice.actions;
export default authSlice.reducer;