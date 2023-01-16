import React, {useEffect} from 'react';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable, PressableProps} from 'react-native';
import {BodyCopy} from '../Typography';

import styles from './Option.styles';
import colors from '../../utils/colors';
import animationConstants from '../../utils/animationConstants';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

type Props = {
  title: string;
  onPress?: () => void;
  isActive?: boolean;
  pressable?: PressableProps;
};

export default ({title, onPress, isActive, pressable}: Props) => {
  const colorChange = useSharedValue(0);
  const scaleChange = useSharedValue(0);

  useEffect(() => {
    if (!isActive) {
      colorChange.value = withTiming(0, {
        duration: animationConstants.BUTTON_IN,
      });
    } else {
      colorChange.value = withTiming(1, {
        duration: animationConstants.BUTTON_OUT,
      });
    }
  }, [isActive, colorChange]);

  const animatedBtnStyle = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        colorChange.value,
        [0, 1],
        [colors.secondary, colors.primary],
      ),
      padding: interpolate(colorChange.value, [0, 1], [12, 11]),
      transform: [
        {
          scale: interpolate(scaleChange.value, [0, 1], [1, 0.99]),
        },
      ],
    }),
    [colorChange, scaleChange],
  );

  const onPressIn = () => {
    scaleChange.value = withTiming(1, {duration: animationConstants.BUTTON_IN});
  };

  const onPressOut = () => {
    scaleChange.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };

  const btnStyle = [styles.btn, animatedBtnStyle, pressable?.style];
  const textStyle = [styles.text, isActive && styles.textActive];

  return (
    <AnimatedPressable
      {...pressable}
      style={btnStyle}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <BodyCopy style={textStyle}>{title}</BodyCopy>
    </AnimatedPressable>
  );
};
