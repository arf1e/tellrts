import React from 'react';
import Reanimated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import colors from '../../utils/colors';
import styles from './Profile.styles';
import animationConstants from '../../utils/animationConstants';
import {SETTINGS} from '../../components/Navigation/ProfileNavigator';
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const SettingsButton = ({
  hiddenShared,
}: {
  hiddenShared: SharedValue<number> | undefined;
}) => {
  const pressedShared = useSharedValue(0);

  const {navigate} = useNavigation();

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
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
      ...(hiddenShared && {
        opacity: interpolate(hiddenShared.value, [0, 1], [0, 1]),
      }),
    }),
    [pressedShared],
  );

  const pressableStyle = [styles.profileSettingsButton, animatedStyle];

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

  //@ts-ignore
  const onPress = () => navigate(SETTINGS);

  return (
    <ReanimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={pressableStyle}>
      <Icon name="settings-outline" color={colors.background} size={30} />
    </ReanimatedPressable>
  );
};

export default SettingsButton;
