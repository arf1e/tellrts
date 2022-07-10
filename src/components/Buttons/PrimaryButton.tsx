import React, {useEffect} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';
import {BodyCopy} from '../Typography';
import ButtonsStyles from './Buttons.styles';
import ButtonProps from './Buttons.types';
import useColorAnimation from './useColorAnimation';

const MyPressable = Reanimated.createAnimatedComponent(Pressable);
const AnimatedText = Reanimated.createAnimatedComponent(Text);
const AnimatedActivityIndicatorContainer =
  Reanimated.createAnimatedComponent(View);
const PrimaryButton = ({title, ...rest}: ButtonProps) => {
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

  const textAnimatedStyles = useAnimatedStyle(
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
    rest.disabled && ButtonsStyles.disabled,
    buttonLoadingStyle,
    rest.style,
  ];

  const textStyles = [ButtonsStyles.btnText, textAnimatedStyles];

  return (
    <MyPressable
      {...rest}
      style={styles}
      onPressOut={pressOut}
      onPressIn={pressIn}
      disabled={rest.disabled || rest.loading}>
      <AnimatedText style={textStyles}>{title}</AnimatedText>
      <AnimatedActivityIndicatorContainer
        style={activityIndicatorContainerStyles}>
        <ActivityIndicator size={24} color={colors.background} />
      </AnimatedActivityIndicatorContainer>
      {rest.children}
    </MyPressable>
  );
};

export default PrimaryButton;
