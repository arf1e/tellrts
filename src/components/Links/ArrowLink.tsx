import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import {BodyCopy} from '../Typography';
import LinkStyles from './Link.styles';

import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';

interface Props extends PressableProps {
  children: string;
  arrowPosition?: 'forward' | 'back';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: string;
}

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const ArrowLink = ({
  children,
  containerStyle,
  textStyle,
  onPress,
  arrowPosition = 'back',
  color,
}: Props) => {
  const pressedShared = useSharedValue(0);

  const onPressIn = () => {
    pressedShared.value = withTiming(1, {
      duration: animationConstants.BUTTON_IN,
    });
  };

  const onPressOut = () => {
    pressedShared.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(pressedShared.value, [0, 1], [1, 0.9]),
      transform: [{scale: interpolate(pressedShared.value, [0, 1], [1, 0.95])}],
    }),
    [pressedShared],
  );

  const containerStyles = [
    LinkStyles.container,
    containerStyle,
    arrowPosition === 'forward' && LinkStyles.arrowRightAlignment,
    animatedStyle,
  ];

  const arrowStyles = [
    arrowPosition === 'forward'
      ? LinkStyles.arrowForward
      : LinkStyles.arrowBack,
  ];

  const textStyles = [LinkStyles.text, textStyle, color && {color}];
  return (
    <AnimatedPressable
      style={containerStyles}
      testID="ArrowLink.pressable"
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Icon
        color={color || colors.primary}
        name={`chevron-${arrowPosition}`}
        size={24}
        style={arrowStyles}
        testID="ArrowLink.arrow"
      />
      <BodyCopy style={textStyles}>{children}</BodyCopy>
    </AnimatedPressable>
  );
};

export default ArrowLink;
