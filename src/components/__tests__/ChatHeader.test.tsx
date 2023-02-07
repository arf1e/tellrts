import React from 'react';
import {render} from '@testing-library/react-native';

import ChatHeader from '../ChatHeader';
import {GET_NAME_AND_PHOTO_QUERY} from '../ChatHeader/ChatHeader.graphql';
import {renderWithProviders} from '../../utils/test-utils';

test('Chat Header renders correctly', async () => {
  const testUserId = 42;
  const testUserName = 'Tellr Test User';
  const testImageUrl = 'tellrtestimage.png';
  const mocks = [
    {
      request: {
        query: GET_NAME_AND_PHOTO_QUERY,
        variables: {userId: testUserId},
      },
      result: {
        data: {
          seeContact: {
            id: testUserId,
            user: {
              id: testUserId,
              name: testUserName,
              photo: testImageUrl,
            },
          },
        },
      },
    },
  ];
  const screen = await render(
    renderWithProviders(<ChatHeader userId={testUserId} />, {mocks}),
  );
  expect(await screen.findByText(testUserName)).toBeOnTheScreen();
  const image = screen.getByTestId('ChatHeader.UserImage');
  expect(image.props.source.uri).toBe(testImageUrl);
});
