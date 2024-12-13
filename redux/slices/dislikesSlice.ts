import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DislikesState {
  dislikes: string[];
}

const initialState: DislikesState = {
  dislikes: [], // start as an empty list
}

const authSlice = createSlice({
  name: 'dislikes',
  initialState,
  reducers: {
    addToRecentDislikes: (state, action: PayloadAction<string>) => {
      state.dislikes.push(action.payload);
    },
    clearRecentDislikes: (state) => {
      state.dislikes = [];
    },
  },
});

export const { addToRecentDislikes, clearRecentDislikes } = authSlice.actions;
export default authSlice.reducer;