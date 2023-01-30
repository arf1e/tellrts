import React, {ReactNode} from 'react';
import {MockedProvider} from '@apollo/client/testing';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {configureStore} from '@reduxjs/toolkit';
import authSliceReducer from './slices/authSlice';
import firebaseTokenSliceReducer from './slices/firebaseTokenSlice';
import anketSliceReducer from './slices/anketSlice';
import requestResultSliceReducer from './slices/requestResultSlice';
import inChatSliceReducer from './slices/inChatSlice';
import contactsInputSliceReducer from './slices/contactsInputSlice';
import searchSettingsSliceReducer from './slices/searchSettingsSlice';

const reducer = {
  auth: authSliceReducer,
  firebase: firebaseTokenSliceReducer,
  anket: anketSliceReducer,
  requestResult: requestResultSliceReducer,
  inChat: inChatSliceReducer,
  contactsInput: contactsInputSliceReducer,
  searchSettings: searchSettingsSliceReducer,
};

export function renderWithProviders(
  ui: ReactNode,
  {
    preloadedState = {},
    mocks = [],
    store = configureStore({reducer, preloadedState}),
    ...renderOptions
  } = {},
) {
  return (
    <MockedProvider mocks={mocks}>
      <Provider store={store}>
        <NavigationContainer>{ui} </NavigationContainer>
      </Provider>
    </MockedProvider>
  );
}
