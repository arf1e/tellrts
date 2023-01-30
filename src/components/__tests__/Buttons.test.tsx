import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import PrimaryButton, {SecondaryButton} from '../Buttons';

test('can press the primary button', () => {
  const buttonTitle = 'Test Title';
  const onPressMock = jest.fn();
  const {getByText} = render(
    <PrimaryButton title={buttonTitle} onPress={onPressMock} />,
  );
  fireEvent.press(getByText(buttonTitle));
  expect(onPressMock).toHaveBeenCalled();
  expect(onPressMock.mock.calls.length).toBe(1);
});

test("can't press the button on loading", () => {
  const buttonTitle = 'Test Title';
  const testID = 'PrimaryButton.container';
  const onPressMock = jest.fn();
  const {getByText, getByTestId} = render(
    <PrimaryButton title={buttonTitle} onPress={onPressMock} loading={true} />,
  );
  expect(getByText(buttonTitle)).not.toBeNull();
  expect(getByTestId(testID)).not.toBeNull();
  fireEvent.press(getByTestId(testID));
  expect(getByTestId(testID)).toHaveAnimatedStyle();
  expect(onPressMock).not.toHaveBeenCalled();
});

test('can press the secondary button', () => {
  const buttonTitle = 'Test Title';
  const testID = 'SecondaryButton.container';
  const onPressMock = jest.fn();

  const {getByTestId} = render(
    <SecondaryButton title={buttonTitle} onPress={onPressMock} />,
  );

  expect(getByTestId(testID)).not.toBeNull();
});

test("can't press secondary button on disabled", () => {
  const buttonTitle = 'Test Title';
  const testID = 'SecondaryButton.container';
  const onPressMock = jest.fn();
  const {getByTestId} = render(
    <SecondaryButton title={buttonTitle} onPress={onPressMock} disabled />,
  );
  fireEvent.press(getByTestId(testID));
  expect(onPressMock).not.toHaveBeenCalled();
});
