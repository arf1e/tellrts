import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {Alert} from 'react-native';
import {act} from 'react-test-renderer';
import {renderWithProviders} from '../../utils/test-utils';
import Register from '../Register';
import {REGISTER_MUTATION} from '../Register/Register.graphql';

const testUserRegisterData = {
  name: 'Egor',
  birthday: '16-10-1997',
  sex: true,
  photo: 'test-photo',
  countryCode: 'FI',
  cityId: 'testingCityId',
  password: 'corr3ctPassword',
  email: 'testinguser@tellr.dating',
};

const RegisterNewUser = () => (
  <Register
    route={{name: 'Signup', params: {email: testUserRegisterData.email}}}
    initialFormikTestingValues={{
      countryCode: testUserRegisterData.countryCode,
      countryTitle: 'Finland',
      cityId: testUserRegisterData.cityId,
      cityTitle: 'Lappeenranta',
    }}
  />
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
  const view = render(
    renderWithProviders(<RegisterNewUser />, {
      mocks: [
        {
          request: {
            query: REGISTER_MUTATION,
            variables: testUserRegisterData,
          },
          result: {
            data: {
              createAccount: {
                ok: true,
                error: 'woah',
                token: 'jwt-test-token',
              },
            },
          },
        },
      ],
    }),
  );
  const nameInput = await view.findByPlaceholderText(
    'register.name.fieldPlaceholder',
  );
  const nameTitle = view.getByText('register.name.title');
  expect(nameTitle).toBeOnTheScreen();
  const nextButton = view.getByTestId(nextStepTestId);
  await act(async () => {
    await fireEvent.changeText(nameInput, testUserRegisterData.name);
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
    await fireEvent.changeText(nameInput, testUserRegisterData.name);
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
    await fireEvent.changeText(birthdayInput, testUserRegisterData.birthday);
  });
  fireEvent.press(view.getByTestId(nextStepTestId));
  expect(birthdayTitle).not.toBeOnTheScreen();
  const photoTitle = view.getByText('register.photo.title');
  expect(photoTitle).toBeOnTheScreen();
  const cameraBtn = view.getByText('register.photo.camera');
  await act(async () => {
    await fireEvent.press(cameraBtn);
  });
  const takeAnotherPhoto = view.getByTestId('Register.Photo.TakeAnother');
  expect(view.getByTestId('Register.Photo.TakeAnother')).toBeOnTheScreen();
  fireEvent.press(takeAnotherPhoto);
  const galleryBtn = view.getByText('register.photo.gallery');
  await act(async () => {
    await fireEvent.press(galleryBtn);
  });
  expect(view.getByTestId('Register.Photo.TakeAnother')).toBeOnTheScreen();
  fireEvent.press(view.getByTestId(nextStepTestId));

  expect(view.getByText('register.location.title')).toBeOnTheScreen();
  expect(view.getByText('Finland')).toBeOnTheScreen();
  expect(view.getByText('Lappeenranta')).toBeOnTheScreen();
  fireEvent.press(view.getByTestId(nextStepTestId));

  expect(view.getByText('register.password.title')).toBeOnTheScreen();
  const passwordField = view.getByTestId('Register.Password.Password');
  const passwordConfirmField = view.getByTestId(
    'Register.Password.PasswordConfirm',
  );

  const fillPasswords = async (password: string) => {
    await act(async () => {
      await fireEvent.changeText(passwordField, password);
      await fireEvent.changeText(passwordConfirmField, password);
    });
  };

  const pass1 = 'wrongPassword';
  await fillPasswords(pass1);

  fireEvent.press(view.getByTestId(nextStepTestId));
  expect(view.getByText('register.password.title')).toBeOnTheScreen();

  await fillPasswords(testUserRegisterData.password);

  fireEvent.press(view.getByTestId(nextStepTestId));
  expect(view.queryByText('register.password.title')).toBeNull();
  expect(view.getByText('register.check.title')).toBeOnTheScreen();
  expect(view.getByText('register.check.nameTitle')).toBeOnTheScreen();
  expect(view.getByText(testUserRegisterData.name)).toBeOnTheScreen();
  expect(view.getByText('register.check.dobTitle')).toBeOnTheScreen();
  expect(view.getByText(testUserRegisterData.birthday)).toBeOnTheScreen();
  expect(view.getByText('register.check.sexTitle')).toBeOnTheScreen();

  await act(async () => {
    await fireEvent.press(view.getByText(testUserRegisterData.name));
  });

  expect(view.getByText('register.name.title')).toBeOnTheScreen();
  expect(view.getByText('register.controls.check')).toBeOnTheScreen();

  await act(async () => {
    await fireEvent.press(view.getByText('register.controls.check'));
  });

  expect(view.getByText('register.check.title')).toBeOnTheScreen();
});
