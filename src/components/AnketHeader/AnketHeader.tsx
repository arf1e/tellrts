import {useDimensions} from '@react-native-community/hooks';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useSharedValue, withDelay, withTiming} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import animationConstants from '../../utils/animationConstants';
import {AnketState} from '../../utils/slices/anketSlice';
import {BodyCopy, Subtitle} from '../Typography';

import styles from './AnketHeader.styles';
import SliderIndicator from './SliderIndicator';

const AnketHeader = () => {
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  const {t} = useTranslation();

  const SCREEN_WIDTH = useDimensions().window.width;
  const [activeSlide, setActiveSlide] = useState(1);
  const INDICATOR_ICONS_ARRAY = ['image', 'text'];
  const SHOULD_DISPLAY_INDICATOR_SHARED = useSharedValue(0);

  const handleScrollEnd = () => {
    SHOULD_DISPLAY_INDICATOR_SHARED.value = withDelay(
      1200,
      withTiming(0, {
        duration: animationConstants.BUTTON_OUT,
      }),
    );
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!e) {
      return;
    }

    const {nativeEvent} = e;
    const CURRENT_OFFSET = nativeEvent.contentOffset.x;
    const ACTIVE_SLIDE =
      CURRENT_OFFSET < SCREEN_WIDTH / 2
        ? 0
        : Math.ceil(CURRENT_OFFSET / SCREEN_WIDTH);
    setActiveSlide(ACTIVE_SLIDE);
  };

  const handleScrollBegin = () => {
    SHOULD_DISPLAY_INDICATOR_SHARED.value = withTiming(1, {
      duration: animationConstants.BUTTON_IN,
    });
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView
          horizontal={true}
          snapToAlignment="center"
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollBeginDrag={handleScrollBegin}
          onScroll={handleScroll}
          scrollEventThrottle={320}
          showsVerticalScrollIndicator={false}>
          <View style={styles.slide1}>
            <Image
              source={{uri: anket?.photo}}
              defaultSource={require('../../assets/image-cap.png')}
              style={styles.picture}
              resizeMode="cover"
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
      </View>
    </>
  );
};

export default AnketHeader;
