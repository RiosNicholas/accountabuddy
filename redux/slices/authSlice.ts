import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UUID } from 'crypto';

interface User {
  user_id: UUID;
  name: string;
  username: string;
  email: string;
  meetingLocation: string | null;
  meetingFrequency: string | null;
  growthAreas: number[] | null;
  accountabilityAreas: number[] | null;
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
    },
    logout: (state) => {
      state.user = null; // Clear the user on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;