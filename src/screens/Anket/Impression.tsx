import React, {useEffect} from 'react';
import {View, Pressable, Image, Text} from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';

import styles from './Anket.styles';
import impressions, {
  getImpressionImage,
  getImpressionTitle,
  ImpressionIcon,
} from '../../assets/impressions';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);
const AnimatedImage = Reanimated.createAnimatedComponent(Image);
const AnimatedText = Reanimated.createAnimatedComponent(Text);

const ImpressionOption = ({
  icon,
  isActive,
  onPress,
  sex,
}: {
  icon: ImpressionIcon;
  isActive: boolean;
  onPress: () => void;
  sex: 'male' | 'female';
}) => {
  const pressedShared = useSharedValue(0);
  const activeShared = useSharedValue(0);

  const handlePressIn = () => {
    pressedShared.value = withTiming(1, {
      duration: animationConstants.BUTTON_IN,
    });
  };

  const handlePressOut = () => {
    pressedShared.value = withSpring(0);
  };

  useEffect(() => {
    if (isActive) {
      activeShared.value = withTiming(1, {
        duration: animationConstants.BUTTON_IN,
      });
      return;
    } else {
      activeShared.value = withTiming(0, {
        duration: animationConstants.BUTTON_OUT,
      });
      return;
    }
  }, [isActive, activeShared]);

  const emojiStyles = useAnimatedStyle(
    () => ({
      transform: [{scale: interpolate(pressedShared.value, [0, 1], [1, 1.25])}],
    }),
    [pressedShared],
  );

  const containerStyles = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        activeShared.value,
        [0, 1],
        [colors.secondary, colors.primary],
      ),
    }),
    [activeShared],
  );

  const titleStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        activeShared.value,
        [0, 1],
        [colors.gray, colors.darkGray],
      ),
    }),
    [activeShared],
  );

  const pressableStyles = [styles.impressionOptionContainer, containerStyles];
  const imageStyles = [styles.impressionOptionImage, emojiStyles];
  const textStyles = [styles.impressionOptionTitle, titleStyles];
  const {t} = useTranslation();
  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={pressableStyles}>
      <AnimatedImage source={getImpressionImage(icon)} style={imageStyles} />
      <AnimatedText style={textStyles}>
        {t(getImpressionTitle(icon, sex))}
      </AnimatedText>
    </AnimatedPressable>
  );
};

const ImpressionPicker = ({
  activeImpressions,
  sex,
  onPressImpression,
}: {
  activeImpressions: ImpressionIcon[];
  sex: 'male' | 'female';
  onPressImpression: (impression: ImpressionIcon) => void;
}) => {
  const isImpressionActive = (impression: ImpressionIcon) =>
    activeImpressions.includes(impression);
  return (
    <View style={styles.impressionPickerContainer}>
      {impressions.map(impression => (
        <ImpressionOption
          icon={impression}
          isActive={isImpressionActive(impression)}
          sex={sex}
          key={impression}
          onPress={() => onPressImpression(impression)}
        />
      ))}
    </View>
  );
};

export default ImpressionPicker;
