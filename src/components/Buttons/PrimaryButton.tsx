import React, {useEffect} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';
import ButtonsStyles from './Buttons.styles';
import ButtonProps from './Buttons.types';
import useColorAnimation from './useColorAnimation';
import Icon from 'react-native-vector-icons/Feather';

const MyPressable = Reanimated.createAnimatedComponent(Pressable);
const AnimatedText = Reanimated.createAnimatedComponent(Text);
const AnimatedView = Reanimated.createAnimatedComponent(View);
const PrimaryButton = ({title, icon, ...rest}: ButtonProps) => {
  const {pressIn, pressOut, animatedStyle} = useColorAnimation(
    colors.primary,
    colors.unsaturatedPrimary,
    'backgroundColor',
  );

  const loadingShared = useSharedValue(0);

  useEffect(() => {
    if (rest.loading) {
      loadingShared.value = withTiming(1, {
        duration: animationConstants.BUTTON_IN,
      });
      return;
    }

    loadingShared.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
    return;
  }, [rest.loading, loadingShared]);

  const buttonLoadingStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        loadingShared.value,
        [0, 1],
        [colors.primary, colors.lightGray],
      ),
    }),
    [loadingShared],
  );

  const contentAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(loadingShared.value, [0, 1], [0, -20]),
        },
      ],
      opacity: interpolate(loadingShared.value, [0, 1], [1, 0]),
    }),
    [loadingShared],
  );

  const activityIndicatorContainerStyles = useAnimatedStyle(
    () => ({
      position: 'absolute', // So I don't need to fuck around with centering
      opacity: interpolate(loadingShared.value, [0, 1], [0, 1]),
      transform: [
        {
          translateY: interpolate(loadingShared.value, [0, 1], [20, 0]),
        },
      ],
      display: loadingShared.value > 0 ? 'flex' : 'none',
    }),
    [loadingShared],
  );

  const styles = [
    ButtonsStyles.skeleton,
    ButtonsStyles.primary,
    animatedStyle,
    buttonLoadingStyle,
    rest.disabled && ButtonsStyles.disabled,
    rest.style,
  ];

  const contentStyles = [contentAnimatedStyles, ButtonsStyles.buttonContent];

  return (
    <MyPressable
      testID="PrimaryButton.container"
      {...rest}
      style={styles}
      onPressOut={pressOut}
      onPressIn={pressIn}
      disabled={rest.disabled || rest.loading}>
      <AnimatedView style={contentStyles}>
        {icon && (
          <Icon
            name="check"
            size={16}
            style={ButtonsStyles.icon}
            color={colors.background}
          />
        )}
        <AnimatedText style={ButtonsStyles.btnText}>{title}</AnimatedText>
      </AnimatedView>
      <AnimatedView style={activityIndicatorContainerStyles}>
        <ActivityIndicator size={24} color={colors.background} />
      </AnimatedView>
      {rest.children}
    </MyPressable>
  );
};

export default PrimaryButton;
