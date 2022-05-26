import React from 'react';
import {Pressable, Image, PressableProps, StyleProp} from 'react-native';

import Reanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';
import styles from './Link.styles';

interface Props extends PressableProps {
  size: number;
  uri: string;
  onPress: () => void;
  imageStyle?: any;
}

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const ImageLink = ({size, onPress, imageStyle, uri, ...rest}: Props) => {
  const pressedShared = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () => ({
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

  const imageStyles = [
    imageStyle,
    {width: size, height: size, borderRadius: size / 2},
  ];
  const pressableStyles = [styles.imageLinkPressable, animatedStyle];

  return (
    <AnimatedPressable
      style={pressableStyles}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}>
      <Image source={{uri}} style={imageStyles} />
    </AnimatedPressable>
  );
};

export default ImageLink;
