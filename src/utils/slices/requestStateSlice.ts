import {createSlice} from '@reduxjs/toolkit';

export const REQUEST_IDLE = 'REQUEST_IDLE';
export const REQUEST_FILLING = 'REQUEST_FILLING';
export const REQUEST_REVIEWING = 'REQUEST_REVIEWING';

export type requestStateState = {
  requestState:
    | typeof REQUEST_IDLE
    | typeof REQUEST_FILLING
    | typeof REQUEST_REVIEWING;
};

const initialState: requestStateState = {
  requestState: REQUEST_IDLE,
};

export const RequestStateSlice = createSlice({
  name: 'requestState',
  initialState,
  reducers: {
    setRequestStateIdle: (state: requestStateState) => {
      state.requestState = REQUEST_IDLE;
    },
    setRequestStateFilling: (state: requestStateState) => {
      state.requestState = REQUEST_FILLING;
    },
    setRequestStateReviewing: (state: requestStateState) => {
      state.requestState = REQUEST_REVIEWING;
    },
  },
});

export const {
  setRequestStateIdle,
  setRequestStateFilling,
  setRequestStateReviewing,
} = RequestStateSlice.actions;
export default RequestStateSlice.reducer;
