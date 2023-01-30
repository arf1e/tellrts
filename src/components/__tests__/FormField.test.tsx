import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FormField from '../Field/FormField';

test('renders correctly', () => {
  const title = 'Test Title';
  const error = 'Test Error';
  const {getByText} = render(<FormField title={title} error={error} />);

  expect(getByText(title)).not.toBeNull();
  expect(getByText(error)).not.toBeNull();
});

test('forwards remaining props to the underlying TextInput', () => {
  const onChangeTextMock = jest.fn();
  const placeholder = 'Test Placeholder';
  const textInput = 'Testing, 123!';

  const {getByTestId} = render(
    <FormField placeholder={placeholder} onChangeText={onChangeTextMock} />,
  );
  expect(getByTestId('Field.TextInput').props).toEqual(
    expect.objectContaining({
      placeholder,
    }),
  );

  fireEvent.changeText(getByTestId('Field.TextInput'), textInput);
  expect(onChangeTextMock).toHaveBeenCalled();
  expect(onChangeTextMock).toHaveBeenCalledWith(textInput);
});
