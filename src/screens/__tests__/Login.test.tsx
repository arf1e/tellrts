import {render} from '@testing-library/react-native';
import React from 'react';
import Login from '../Login';
import {renderWithProviders} from '../../utils/test-utils';
beforeAll(() => {
  jest.mock('react-native-reanimated', () =>
    jest.requireActual(
      '../../node_modules/react-native-reanimated/lib/reanimated2/mock',
    ),
  );
});

test('Login Screen Renders', () => {
  const view = render(renderWithProviders(<Login />, {}));
  expect(view).toMatchSnapshot();
});
