/* eslint-disable no-undef, import/no-extraneous-dependencies */
import {configure} from '@testing-library/react-native';
// Import Jest Native matchers
import '@testing-library/jest-native/extend-expect';

global.__reanimatedWorkletInit = () => {};
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => null),
  };
});
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'en',
      },
    };
  },
}));
jest.mock('react-native-image-crop-picker', () => ({
  openPicker: () =>
    new Promise.resolve({
      width: 1000,
      height: 1000,
      size: 1024,
      path: 'test/test.jpg',
      mime: 'image/jpeg',
      filename: 'test/test.jpg',
    }),
  openCamera: () =>
    new Promise.resolve({
      width: 1000,
      height: 1000,
      size: 1024,
      path: 'test/test.jpg',
      mime: 'image/jpeg',
      filename: 'test/test.jpg',
    }),
}));
jest.mock('react-native-text-input-mask', () => 'TextInputMask');

jest.mock('./src/utils/apollo.ts', () => ({}));
jest.mock('./src/utils/photo.ts', () => ({
  generateRNFile: () => Promise.resolve('test-photo'),
}));
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Setup Reanimated mocking for Drawer navigation
global.ReanimatedDataMock = {now: () => Date.now()};

// Enable excluding hidden elements from the queries by default
configure({
  defaultIncludeHiddenElements: false,
});
