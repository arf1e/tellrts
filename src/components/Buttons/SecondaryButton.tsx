import React from 'react';
import ButtonProps from './Buttons.types';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable, Text} from 'react-native';
import ButtonsStyles from './Buttons.styles';
import colors from '../../utils/colors';
import animationConstants from '../../utils/animationConstants';
import Icon from 'react-native-vector-icons/Feather';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);
const AnimatedText = Reanimated.createAnimatedComponent(Text);

const SecondaryButton = ({title, icon, ...rest}: ButtonProps) => {
  const isPressed = useSharedValue(0);
  const animatedBtnStyle = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        isPressed.value,
        [0, 1],
        [colors.primary, colors.unsaturatedPrimary],
      ),
      borderWidth: interpolate(isPressed.value, [0, 1], [1, 1.5]),
      transform: [
        {
          scale: interpolate(
            isPressed.value,
            [0, 1],
            [1, animationConstants.SCALE_ON_PRESS],
          ),
        },
      ],
    }),
    [isPressed],
  );

  const animatedTextStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        isPressed.value,
        [0, 1],
        [colors.primary, colors.unsaturatedPrimary],
      ),
    }),
    [isPressed],
  );

  const btnStyles = [
    ButtonsStyles.skeleton,
    ButtonsStyles.secondaryBtn,
    animatedBtnStyle,
    rest.disabled && ButtonsStyles.disabled,
    rest.style,
  ];

  const textStyles = [
    ButtonsStyles.btnText,
    ButtonsStyles.secondaryBtnText,
    animatedTextStyle,
  ];

  const pressIn = () => {
    isPressed.value = withTiming(1, {duration: animationConstants.BUTTON_IN});
  };

  const pressOut = () => {
    isPressed.value = withTiming(0, {duration: animationConstants.BUTTON_OUT});
  };
  return (
    <AnimatedPressable
      testID="SecondaryButton.container"
      {...rest}
      style={btnStyles}
      onPressIn={pressIn}
      onPressOut={pressOut}>
      {icon && (
        <Icon
          name={icon}
          size={16}
          color={colors.primary}
          style={ButtonsStyles.icon}
        />
      )}
      <AnimatedText style={textStyles}>{title}</AnimatedText>
    </AnimatedPressable>
  );
};

export default SecondaryButton;
