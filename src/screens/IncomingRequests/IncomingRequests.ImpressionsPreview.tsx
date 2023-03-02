import React, {useState} from 'react';
import styles from './IncomingRequests.styles';
import Reanimated, {
  FadeIn,
  interpolate,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  getImpressionImage,
  getImpressionTitle,
  ImpressionIcon,
} from '../../assets/impressions';
import {useTranslation} from 'react-i18next';
import animationConstants from '../../utils/animationConstants';
import {Image, Pressable, Text, View} from 'react-native';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);
const AnimatedText = Reanimated.createAnimatedComponent(Text);
const AnimatedView = Reanimated.createAnimatedComponent(View);

const ImpressionBadge = ({
  impression,
  sex,
  active,
  onPress,
}: {
  impression: ImpressionIcon;
  sex: boolean;
  active: boolean;
  onPress: () => void;
}) => {
  const impressionSex = sex ? 'male' : 'female';
  const {t} = useTranslation();
  const LAYOUT_TIMING = animationConstants.BUTTON_IN / 1.2;
  const isPressedShared = useSharedValue(0);

  const onPressIn = () => {
    isPressedShared.value = withTiming(1, {
      duration: animationConstants.BUTTON_IN,
    });
  };

  const onPressOut = () => {
    isPressedShared.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };

  const animatedPressableStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(isPressedShared.value, [0, 1], [1, 0.95]),
      },
    ],
  }));

  const pressableStyles = [
    styles.impressionBadgeContainer,
    animatedPressableStyle,
  ];

  return (
    <AnimatedPressable
      layout={Layout.duration(LAYOUT_TIMING)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={pressableStyles}>
      <Image
        source={getImpressionImage(impression)}
        style={styles.impressionBadgeImage}
      />
      {active && (
        <AnimatedText
          entering={FadeIn.duration(LAYOUT_TIMING)}
          style={styles.impressionBadgeText}>
          {t(getImpressionTitle(impression, impressionSex))}
        </AnimatedText>
      )}
    </AnimatedPressable>
  );
};

const ImpressionsPreview = ({
  impressions,
  sex,
}: {
  impressions: ImpressionIcon[];
  sex: boolean;
}) => {
  const [activeImpression, setActiveImpression] =
    useState<ImpressionIcon | null>(null);

  const activateImpression = (toggledImpression: ImpressionIcon) => {
    if (activeImpression === toggledImpression) {
      setActiveImpression(null);
      return;
    }

    setActiveImpression(toggledImpression);
  };
  return (
    <AnimatedView layout={Layout} style={styles.activeRequestBadgesContainer}>
      {impressions.map(impression => (
        <ImpressionBadge
          key={impression}
          impression={impression}
          sex={sex}
          active={activeImpression === impression}
          onPress={() => activateImpression(impression)}
        />
      ))}
    </AnimatedView>
  );
};

export default ImpressionsPreview;
