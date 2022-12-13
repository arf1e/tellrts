import React from 'react';
import {expect, jest, test} from '@jest/globals';
import Login from '../../Login';
import {MockedProvider} from '@apollo/client/testing';
import {render, screen} from '@testing-library/react-native';

test('Login renders as expected', () => {
  render(
    <MockedProvider mocks={[]}>
      <Login />
    </MockedProvider>,
  );
  expect(screen.toJSON()).toMatchSnapshot();
});
