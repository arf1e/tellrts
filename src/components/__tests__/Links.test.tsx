import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import Link, {ArrowLink, ImageLink} from '../Links';

test('Link works correctly', () => {
  const linkText = 'Test Link';
  const mockOnPress = jest.fn();
  const {getByText, queryByTestId} = render(
    <Link onPress={mockOnPress}>{linkText}</Link>,
  );

  const linkElement = getByText(linkText);
  const [feather, ionic] = [
    queryByTestId('Link.feather.icon'),
    queryByTestId('Link.ionicons.icon'),
  ];
  expect(feather).toBeNull();
  expect(ionic).toBeNull();
  expect(linkElement).not.toBeNull();
  fireEvent.press(linkElement);
  expect(mockOnPress).toHaveBeenCalled();
  expect(linkElement).not.toHaveProp('icon');
});

test('Link with feather icon works correctly', () => {
  const linkText = 'Test Link';
  const mockOnPress = jest.fn();
  const iconTestId = 'Link.feather.icon';
  const {getByText, getByTestId} = render(
    <Link onPress={mockOnPress} icon="briefcase">
      {linkText}
    </Link>,
  );
  const linkElement = getByText(linkText);
  const iconElement = getByTestId(iconTestId);
  expect(linkElement).not.toBeNull();
  expect(iconElement).not.toBeNull();
  fireEvent.press(linkElement);
  expect(mockOnPress).toHaveBeenCalled();
});

test('Link with Ionic icon works correctly', () => {
  const linkText = 'Test Link';
  const mockOnPress = jest.fn();
  const iconTestId = 'Link.ionicons.icon';
  const {getByText, getByTestId} = render(
    <Link onPress={mockOnPress} icon="ionicons/text">
      {linkText}
    </Link>,
  );
  const linkElement = getByText(linkText);
  const iconElement = getByTestId(iconTestId);
  expect(linkElement).not.toBeNull();
  expect(iconElement).not.toBeNull();
  fireEvent.press(linkElement);
  expect(mockOnPress).toHaveBeenCalled();
});

test('ArrowLink works correctly', () => {
  const linkText = 'Test Link';
  const linkTestID = 'ArrowLink.pressable';
  const mockOnPress = jest.fn();
  const arrowTestId = 'ArrowLink.arrow';
  const {getByText, getByTestId} = render(
    <ArrowLink arrowPosition="forward" onPress={mockOnPress}>
      {linkText}
    </ArrowLink>,
  );
  const linkElement = getByText(linkText);
  const pressableElement = getByTestId(linkTestID);
  expect(pressableElement).toHaveAnimatedStyle({
    opacity: 1,
    transform: [{scale: 1}],
  });
  fireEvent.press(pressableElement);
  expect(pressableElement).toHaveStyle({
    opacity: 1,
  });
  const arrowElement = getByTestId(arrowTestId);
  expect(linkElement).not.toBeNull();
  expect(arrowElement).not.toBeNull();
});

test('ImageLink works correctly', () => {
  const imageUri = 'https://via.placeholder.com/300';
  const imageSize = 300;
  const mockOnPress = jest.fn();
  const imageTestId = 'ImageLink.image';
  const {getByTestId} = render(
    <ImageLink uri={imageUri} size={imageSize} onPress={mockOnPress} />,
  );
  const imageElement = getByTestId(imageTestId);
  expect(imageElement).not.toBeNull();
  expect(imageElement.props).toEqual(
    expect.objectContaining({
      source: {uri: imageUri},
    }),
  );
  fireEvent.press(imageElement);
  expect(mockOnPress).toHaveBeenCalled();
});
