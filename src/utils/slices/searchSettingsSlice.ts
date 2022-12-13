import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const LOCATION_LOCAL = 'local';
export const LOCATION_INTERNET = 'internet';

export type SearchSettingsState = {
  location: typeof LOCATION_LOCAL | typeof LOCATION_INTERNET;
};
const initialState: SearchSettingsState = {
  location: LOCATION_LOCAL,
};

export const SearchSettingsSlice = createSlice({
  name: 'searchSettings',
  initialState,
  reducers: {
    setSearchLocation: (
      state,
      action: PayloadAction<typeof LOCATION_INTERNET | typeof LOCATION_LOCAL>,
    ) => {
      state.location = action.payload;
    },
  },
});

export const {setSearchLocation} = SearchSettingsSlice.actions;
export default SearchSettingsSlice.reducer;
