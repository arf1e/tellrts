import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../screens/Search/Search.graphql';

export interface AnketState {
  user: User;
}

const initialState: AuthState = {
  token: null,
};

export const AuthSlice = createSlice({
  name: 'anket',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
    },
    logOut: state => {
      state.token = null;
      client.clearStore();
    },
  },
});

export const {logIn, logOut} = AuthSlice.actions;
export default AuthSlice.reducer;
