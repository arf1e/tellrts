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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';
import styles from './Link.styles';

const AnimatedText = Reanimated.createAnimatedComponent(Text);

interface Props extends PressableProps {
  children: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: string;
}

const Link = ({children, containerStyle, textStyle, icon, ...rest}: Props) => {
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

  const renderIcon = () => {
    if (!icon) {
      return null;
    }
    if (icon.startsWith('ionicons/')) {
      const iconName = icon.split('/')[1];
      return (
        <Ionicons
          testID="Link.ionicons.icon"
          name={iconName}
          size={20}
          color={colors.primary}
          style={styles.linkIcon}
        />
      );
    }
    return (
      <Feather
        testID="Link.feather.icon"
        name={icon}
        size={20}
        color={colors.primary}
        style={styles.linkIcon}
      />
    );
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
      hitSlop={8}
      style={pressableStyle}>
      {icon && renderIcon()}
      <AnimatedText style={titleStyle}>{children}</AnimatedText>
    </Pressable>
  );
};

export default Link;
