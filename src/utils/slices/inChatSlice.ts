import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface inChatState {
  inChat: true | false;
}

const initialState: inChatState = {
  inChat: false,
};

export const inChatSlice = createSlice({
  name: 'inChat',
  initialState,
  reducers: {
    getInChat: state => {
      state.inChat = true;
    },
    exitChat: state => {
      state.inChat = false;
    },
  },
});

export const {getInChat, exitChat} = inChatSlice.actions;
export default inChatSlice.reducer;
