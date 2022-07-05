import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  firebaseToken: string | null;
}

const initialState: AuthState = {
  firebaseToken: null,
};

export const AuthSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<AuthState>) => {
      state.firebaseToken = action.payload.firebaseToken;
    },
  },
});

export const {saveToken} = AuthSlice.actions;
export default AuthSlice.reducer;
