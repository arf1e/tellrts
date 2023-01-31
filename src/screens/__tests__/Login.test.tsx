import {render} from '@testing-library/react-native';
import React from 'react';
import Login from '../Login';
import {renderWithProviders} from '../../utils/test-utils';

test('Login Screen Renders', () => {
  const view = render(renderWithProviders(<Login />, {}));
  expect(view).toMatchSnapshot();
});
