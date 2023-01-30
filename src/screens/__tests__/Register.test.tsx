import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {Alert, TextInput} from 'react-native';
import {act} from 'react-test-renderer';
import {renderWithProviders} from '../../utils/test-utils';
import Register from '../Register';

const unknownUserEmail = 'testinguser@tellr.dating';
const RegisterNewUser = () => (
  <Register route={{name: 'Signup', params: {email: unknownUserEmail}}} />
);
const nextStepTestId = 'Register.ControlPanel.next';
const previousStepTestId = 'Register.ControlPanel.back';

test('Register Screen Renders', () => {
  const view = render(renderWithProviders(<RegisterNewUser />));
  expect(view.toJSON()).toMatchSnapshot();
});

test('Pressing back on the first step causes modal to open', () => {
  jest.spyOn(Alert, 'alert');
  const view = render(renderWithProviders(<RegisterNewUser />));

  const nameTitle = view.getByText('register.name.title');
  expect(nameTitle).not.toBeNull();
  const sexTitle = view.queryByText('register.sex.title');
  expect(sexTitle).toBeNull();

  const backButton = view.getByTestId(previousStepTestId);
  fireEvent.press(backButton);
  expect(Alert.alert).toHaveBeenCalled();
});

test('Pressing next without value causes no effect', () => {
  const view = render(renderWithProviders(<RegisterNewUser />));
  const nextButton = view.getByTestId(nextStepTestId);
  const nameTitle = view.getByText('register.name.title');
  expect(nameTitle).not.toBeNull();
  fireEvent.press(nextButton);
  expect(nameTitle).not.toBeNull();
});

test('Next step becomes available after name input', async () => {
  const view = render(renderWithProviders(<RegisterNewUser />));
  const nameInput = await view.findByPlaceholderText(
    'register.name.fieldPlaceholder',
  );
  const nameTitle = view.getByText('register.name.title');
  expect(nameTitle).toBeOnTheScreen();
  const nextButton = view.getByTestId(nextStepTestId);
  await act(async () => {
    await fireEvent.changeText(nameInput, 'George');
  });
  fireEvent.press(nextButton);
  expect(nameTitle).not.toBeOnTheScreen();
  const sexTitle = view.getByText('register.sex.title');
  expect(sexTitle).toBeOnTheScreen();
});

test('Register process', async () => {
  const view = render(renderWithProviders(<RegisterNewUser />));
  const nameTitle = view.getByText('register.name.title');
  expect(nameTitle).toBeOnTheScreen();
  const nameInput = await view.findByPlaceholderText(
    'register.name.fieldPlaceholder',
  );
  await act(async () => {
    await fireEvent.changeText(nameInput, 'George');
  });
  fireEvent.press(view.getByTestId(nextStepTestId));
  const maleButton = view.getByText('register.sex.male');
  const femaleButton = view.getByText('register.sex.female');
  await act(async () => {
    await fireEvent.press(maleButton);
    await fireEvent.press(femaleButton);
    await fireEvent.press(maleButton);
  });
  fireEvent.press(view.getByTestId(nextStepTestId));
  const birthdayTitle = view.getByText('register.birthday.title');
  expect(birthdayTitle).toBeOnTheScreen();
  const birthdayInput = view.getByTestId('Register.birthday.BirthdayInput');
  await act(async () => {
    await fireEvent.changeText(birthdayInput, 'asdasdfafsa');
  });
  fireEvent.press(view.getByTestId(nextStepTestId));
  expect(birthdayTitle).toBeOnTheScreen();
  expect(birthdayInput).toBeOnTheScreen();
  await act(async () => {
    await fireEvent.changeText(birthdayInput, '16-10-1997');
  });
  fireEvent.press(view.getByTestId(nextStepTestId));
  expect(birthdayTitle).not.toBeOnTheScreen();
  const photoTitle = view.getByText('register.photo.title');
});
