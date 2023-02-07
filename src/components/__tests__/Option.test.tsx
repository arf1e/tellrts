import React from 'react';
import {render} from '@testing-library/react-native';

import Option from '../Option/Option';

test('Option works as expected', async () => {
  const onPressMock = jest.fn();
  const view = render(<Option title="Test Option" onPress={onPressMock} />);
  expect(view.toJSON()).toMatchSnapshot();
});
