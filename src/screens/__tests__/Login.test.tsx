import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {renderWithProviders} from '../../utils/test-utils';
import {act} from 'react-test-renderer';
import Password from '../Login/Password';
import Email from '../Login/Email';
import Login from '../Login';

describe('Login Screen', () => {
  test('Login Screen renders', () => {
    const {toJSON} = render(renderWithProviders(<Login />));
    expect(toJSON()).toMatchSnapshot();
  });

  test('Email field works as expected', async () => {
    const handleChangeMock = jest.fn();
    const testEmail = 'testuser@tellr.dating';
    const emailForm = render(
      renderWithProviders(
        <Email
          value={testEmail}
          isInvalid={true}
          error={'login.email.errors.incorrectEmail'}
          handleChange={handleChangeMock}
          handleSubmit={jest.fn()}
        />,
      ),
    );
    const emailField = emailForm.getByPlaceholderText(
      'login.form.emailPlaceholder',
    );
    expect(emailField).toBeOnTheScreen();
    const testText = 'whatever';
    await act(async () => {
      await fireEvent.changeText(emailField, testText);
    });
    expect(handleChangeMock).toBeCalledWith(testText);
  });

  test('Email field shows error', () => {
    const testEmail = 'testuser@tellr.dating';
    const emailForm = render(
      renderWithProviders(
        <Email
          value={testEmail}
          isInvalid={true}
          error={'login.email.errors.incorrectEmail'}
          handleChange={jest.fn()}
          handleSubmit={jest.fn()}
        />,
      ),
    );
    const errorText = emailForm.getByText('login.email.errors.incorrectEmail');
    expect(errorText).toBeOnTheScreen();
  });

  test('Sign up button renders when email does not exist', () => {
    const goBackMock = jest.fn();
    const view = render(
      renderWithProviders(
        <Password
          email={'testuser@tellr.dating'}
          emailExists={false}
          goBack={goBackMock}
        />,
      ),
    );
    expect(view.queryByText('login.form.passwordFieldTitle')).toBeNull();
    expect(view.getByText('login.form.signUpBtn')).toBeOnTheScreen();
  });

  test('Password Field renders when email exists', () => {
    const goBackMock = jest.fn();
    const view = render(
      renderWithProviders(
        <Password
          email={'testuser@tellr.dating'}
          emailExists={true}
          goBack={goBackMock}
        />,
      ),
    );
    expect(view.getByText('login.form.passwordFieldTitle')).toBeOnTheScreen();
    expect(view.queryByText('login.form.signUpBtn')).toBeNull();
  });
});
