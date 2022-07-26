import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Anket} from '../../screens/Search/Search.graphql';

export interface AnketState {
  anket: Anket | null;
}

const initialState: AnketState = {
  anket: null,
};

export const AnketSlice = createSlice({
  name: 'anket',
  initialState,
  reducers: {
    setAnket: (state, action: PayloadAction<AnketState>) => {
      state.anket = action.payload.anket;
    },
    clearAnket: state => {
      state.anket = null;
    },
  },
});

export const {setAnket, clearAnket} = AnketSlice.actions;
export default AnketSlice.reducer;
