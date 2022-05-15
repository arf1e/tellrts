import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
    },
    logOut: state => {
      state.token = null;
    },
  },
});

export const {logIn, logOut} = AuthSlice.actions;
export default AuthSlice.reducer;
