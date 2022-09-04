import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SendRequestResponse} from '../../screens/Anket/Anket.graphql';

export type RequestResultState = {
  requestResult: SendRequestResponse | null;
};

const initialState: RequestResultState = {
  requestResult: null,
};

export const RequestResultSlice = createSlice({
  name: 'requestResult',
  initialState,
  reducers: {
    setRequestResult: (state, action: PayloadAction<RequestResultState>) => {
      state.requestResult = action.payload.requestResult;
    },
    clearRequestResult: state => {
      state.requestResult = null;
    },
  },
});

export const {setRequestResult, clearRequestResult} =
  RequestResultSlice.actions;
export default RequestResultSlice.reducer;
