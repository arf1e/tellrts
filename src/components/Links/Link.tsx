import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';
import styles from './Link.styles';

const AnimatedText = Reanimated.createAnimatedComponent(Text);

interface Props extends PressableProps {
  children: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Link = ({children, containerStyle, textStyle, ...rest}: Props) => {
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
      color: interpolateColor(
        pressedShared.value,
        [0, 1],
        [colors.primary, colors.unsaturatedPrimary],
      ),
      transform: [
        {
          scale: interpolate(
            pressedShared.value,
            [0, 1],
            [1, animationConstants.SCALE_ON_PRESS],
          ),
        },
      ],
    }),
    [pressedShared],
  );

  const titleStyle = [styles.text, textStyle, animatedStyle];
  const pressableStyle = [styles.container, containerStyle];

  return (
    <Pressable
      onPress={rest.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={pressableStyle}>
      <AnimatedText style={titleStyle}>{children}</AnimatedText>
    </Pressable>
  );
};

export default Link;
