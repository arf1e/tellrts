import React, {ReactNode} from 'react';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
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

type TRenderParams = {
  mocks?: readonly MockedResponse<Record<string, any>>[] | undefined;
  preloadedState?: any;
};

export function renderWithProviders(
  ui: ReactNode,
  params: TRenderParams = {
    mocks: [],
    preloadedState: {},
  },
) {
  const store = configureStore({
    reducer,
    preloadedState: params.preloadedState || {},
  });
  return (
    <MockedProvider mocks={params.mocks} addTypename={true}>
      <Provider store={store}>
        <NavigationContainer>{ui} </NavigationContainer>
      </Provider>
    </MockedProvider>
  );
}
