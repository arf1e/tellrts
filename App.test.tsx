import React from 'react';
import {expect, jest, test} from '@jest/globals';
import App from './App';
import {MockedProvider} from '@apollo/client/testing';
import {render, screen} from '@testing-library/react-native';

test('Login renders as expected', () => {
  render(
    <MockedProvider mocks={[]}>
      <App />
    </MockedProvider>,
  );
  expect(screen.toJSON()).toMatchSnapshot();
});
