import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import styles from './Buttons.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Reanimated, {
  BaseAnimationBuilder,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  icon: string;
  size?: number;
  iconSize?: number;
  onPress: () => void;
  iconColor?: string;
  entering?: BaseAnimationBuilder;
  exiting?: BaseAnimationBuilder;
}

const CircleButton = ({
  icon,
  size = 44,
  iconSize = 24,
  iconColor = colors.background,
  onPress,
  entering,
  ...rest
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
      transform: [{scale: interpolate(pressedShared.value, [0, 1], [1, 0.95])}],
    }),
    [pressedShared],
  );

  const pressableStyles = [
    {width: size, height: size, borderRadius: size / 2},
    styles.circleButton,
    animatedStyle,
    rest.style,
  ];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={pressableStyles}
      entering={entering}>
      <Icon name={icon} size={iconSize} color={iconColor} />
    </AnimatedPressable>
  );
};

export default CircleButton;
