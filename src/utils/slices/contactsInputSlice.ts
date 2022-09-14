import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ContactsInputState {
  inputValue: string;
  isFocused: boolean;
}

const initialState: ContactsInputState = {
  inputValue: '',
  isFocused: false,
};

export const ContactsInputSlice = createSlice({
  name: 'contactsInput',
  initialState,
  reducers: {
    focusOnInput: state => {
      state.isFocused = true;
    },
    blurInput: state => {
      state.isFocused = false;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    clearInputValue: state => {
      state.inputValue = '';
    },
  },
});

export const {focusOnInput, blurInput, setInputValue, clearInputValue} =
  ContactsInputSlice.actions;
export default ContactsInputSlice.reducer;
