import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import firebaseReducer from './slices/firebaseTokenSlice';
import anketReducer from './slices/anketSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistAnketConfig = {
  key: 'anket',
  version: 1,
  storage: AsyncStorage,
};

const persistAuthConfig = {
  key: 'auth',
  version: 1,
  storage: AsyncStorage,
};

const persistFirebaseConfig = {
  key: 'firebase',
  version: 1,
  storage: AsyncStorage,
};

const persistedAnketReducer = persistReducer(persistAnketConfig, anketReducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedFirebaseReducer = persistReducer(
  persistFirebaseConfig,
  firebaseReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    firebase: persistedFirebaseReducer,
    anket: persistedAnketReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const storePersistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
