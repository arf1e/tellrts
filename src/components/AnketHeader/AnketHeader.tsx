import {useDimensions} from '@react-native-community/hooks';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import Reanimated, {
  Extrapolate,
  interpolate,
  Layout,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {AVATAR_HEIGHT} from '../../utils/photos';
import {AnketState} from '../../utils/slices/anketSlice';
import {PinchablePhoto} from '../PinchablePhoto';
import {BodyCopy, Subtitle} from '../Typography';

import styles from './AnketHeader.styles';
import SliderIndicator from './SliderIndicator';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

const AnketHeader = () => {
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  const {t} = useTranslation();
  const SCREEN_WIDTH = useDimensions().window.width;
  const [activeSlide, setActiveSlide] = useState(0);
  const INDICATOR_ICONS_ARRAY = ['image', 'text'];
  const interfaceTiltShared = useSharedValue(1);
  const SHOULD_DISPLAY_INDICATOR_SHARED = useSharedValue(1);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!e) {
      return;
    }

    const {nativeEvent} = e;
    const CURRENT_OFFSET = nativeEvent.contentOffset.x;
    const TOTAL_SLIDES = Math.ceil(
      nativeEvent.contentSize.width / SCREEN_WIDTH,
    );
    const ACTIVE_SLIDE =
      CURRENT_OFFSET < SCREEN_WIDTH / 2
        ? 0
        : Math.min(Math.ceil(CURRENT_OFFSET / SCREEN_WIDTH), TOTAL_SLIDES - 1);
    setActiveSlide(ACTIVE_SLIDE);
  };

  const animatedViewStyle = useAnimatedStyle(() => ({
    height: interpolate(
      interfaceTiltShared.value,
      [1, 3],
      [AVATAR_HEIGHT, AVATAR_HEIGHT * 1.4],
      Extrapolate.CLAMP,
    ),
  }));

  return (
    <>
      <ReanimatedView style={[styles.mainContainer, animatedViewStyle]}>
        <ScrollView
          horizontal={true}
          snapToAlignment="center"
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={320}
          showsVerticalScrollIndicator={false}>
          <View style={styles.slide1}>
            <PinchablePhoto
              source={{uri: anket?.photo}}
              style={styles.picture}
              hideableShared={SHOULD_DISPLAY_INDICATOR_SHARED}
              interfaceTiltShared={interfaceTiltShared}
            />
          </View>
          <View style={styles.descriptionSlide}>
            <View style={styles.descriptionContainer}>
              <Subtitle style={styles.descriptionTitle}>
                {t('app.anket.descriptionTitle')}
              </Subtitle>
              <BodyCopy style={styles.descriptionText}>
                {anket?.bio || ''}
              </BodyCopy>
            </View>
          </View>
        </ScrollView>
        <SliderIndicator
          icons={INDICATOR_ICONS_ARRAY}
          activeSlide={activeSlide}
          shouldDisplay={SHOULD_DISPLAY_INDICATOR_SHARED}
        />
      </ReanimatedView>
    </>
  );
};

export default AnketHeader;
