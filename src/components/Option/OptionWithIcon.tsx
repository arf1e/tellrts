import React, {useEffect} from 'react';
import {Pressable} from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BodyCopy} from '../Typography';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './Option.styles';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);
const ReanimatedIcon = Reanimated.createAnimatedComponent(Icon);

type Props = {
  title: string;
  icon: {
    title: string;
    size: number;
  };
  onPress: () => any;
  isActive?: boolean;
  containerStyle?: object;
};

export default ({title, icon, onPress, containerStyle, isActive}: Props) => {
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
      borderWidth: interpolate(colorChange.value, [0, 1], [1, 2]),
      padding: interpolate(colorChange.value, [0, 1], [12, 11]),
      transform: [
        {
          scale: interpolate(scaleChange.value, [0, 1], [1, 0.99]),
        },
      ],
    }),
    [colorChange, scaleChange],
  );

  const animatedIconStyle = useAnimatedStyle(
    () => ({
      color: colors.primary,
      opacity: interpolate(colorChange.value, [0, 1], [0.7, 1]),
    }),
    [colorChange],
  );

  const onPressIn = () => {
    scaleChange.value = withTiming(1, {duration: animationConstants.BUTTON_IN});
  };

  const onPressOut = () => {
    scaleChange.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };

  const btnStyle = [
    styles.btn,
    styles.btnIcon,
    containerStyle,
    animatedBtnStyle,
  ];
  const iconStyle = [styles.icon, animatedIconStyle];
  const textStyle = [
    styles.text,
    styles.btnIconText,
    isActive && styles.textActive,
  ];
  return (
    <ReanimatedPressable
      style={btnStyle}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}>
      <ReanimatedIcon style={iconStyle} name={icon.title} size={icon.size} />
      <BodyCopy style={textStyle}>{title}</BodyCopy>
    </ReanimatedPressable>
  );
};
