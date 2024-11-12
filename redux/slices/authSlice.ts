import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UUID } from 'crypto';

interface User {
  user_id: UUID;
  name: string;
  meetingLocation: string;
  meetingFrequency: string;
  growthAreas: number[];
  accountabilityAreas: number[];
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null, // Start with no user logged in
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Set the user on login
      console.log(state.user)
    },
    logout: (state) => {
      state.user = null; // Clear the user on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;