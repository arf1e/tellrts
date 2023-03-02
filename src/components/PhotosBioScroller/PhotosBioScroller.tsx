import {useDimensions} from '@react-native-community/hooks';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeScrollEvent, NativeSyntheticEvent, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {AVATAR_HEIGHT} from '../../utils/photos';
import {PinchablePhoto} from '../PinchablePhoto';
import {BodyCopy, Subtitle} from '../Typography';

import styles from './PhotosBioScroller.styles';
import SliderIndicator from './SliderIndicator';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

type SLIDER_IMAGE_INPUT = {
  type: 'image';
  url: string;
};

type SLIDER_TEXT_INPUT = {
  type: 'text';
  title?: string;
  content: string;
};

type SLIDES_INPUT = Array<SLIDER_IMAGE_INPUT | SLIDER_TEXT_INPUT>;

const AnketHeader = ({
  slides,
  width,
  height,
  pinchable = true,
}: {
  slides: SLIDES_INPUT;
  width?: number;
  height?: number;
  pinchable?: boolean;
}) => {
  const {t} = useTranslation();
  const SCREEN_WIDTH = useDimensions().screen.width;

  const ELEMENT_WIDTH = width ?? SCREEN_WIDTH;
  const ELEMENT_HEIGHT = height ?? AVATAR_HEIGHT;

  const [activeSlide, setActiveSlide] = useState(0);
  const interfaceTiltShared = useSharedValue(1);
  const SHOULD_DISPLAY_INDICATOR_SHARED = useSharedValue(1);
  const INDICATOR_ICONS_ARRAY = slides.map(elt => elt.type);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!e) {
      return;
    }

    const {nativeEvent} = e;
    const CURRENT_OFFSET = nativeEvent.contentOffset.x;
    const TOTAL_SLIDES = Math.ceil(
      nativeEvent.contentSize.width / ELEMENT_WIDTH,
    );
    const ACTIVE_SLIDE =
      CURRENT_OFFSET < ELEMENT_WIDTH / 2
        ? 0
        : Math.min(Math.ceil(CURRENT_OFFSET / ELEMENT_WIDTH), TOTAL_SLIDES - 1);
    setActiveSlide(ACTIVE_SLIDE);
  };

  const animatedViewStyle = useAnimatedStyle(() => ({
    height: interpolate(
      interfaceTiltShared.value,
      [1, 3],
      [ELEMENT_HEIGHT, ELEMENT_HEIGHT * 1.4],
      Extrapolate.CLAMP,
    ),
  }));

  return (
    <ReanimatedView style={[styles.mainContainer, animatedViewStyle]}>
      <ScrollView
        horizontal={true}
        snapToAlignment="center"
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={320}
        showsVerticalScrollIndicator={false}>
        {slides.map(slide => {
          switch (slide.type) {
            case 'image':
              return (
                <View style={styles.slide} key={`${slide.type}-${slide.url}`}>
                  <PinchablePhoto
                    pinchable={pinchable}
                    source={{uri: slide.url}}
                    defaultSource={require('../../assets/image-cap.png')}
                    style={styles.picture}
                    hideableShared={SHOULD_DISPLAY_INDICATOR_SHARED}
                    interfaceTiltShared={interfaceTiltShared}
                  />
                </View>
              );
            case 'text':
              return (
                <View
                  style={styles.descriptionSlide}
                  key={`${slide.type}-${slide.content}`}>
                  <View style={styles.descriptionContainer}>
                    <Subtitle style={styles.descriptionTitle}>
                      {t('app.anket.descriptionTitle')}
                    </Subtitle>
                    <BodyCopy style={styles.descriptionText}>
                      {slide.content}
                    </BodyCopy>
                  </View>
                </View>
              );
          }
        })}
      </ScrollView>
      <SliderIndicator
        icons={INDICATOR_ICONS_ARRAY}
        activeSlide={activeSlide}
        shouldDisplay={SHOULD_DISPLAY_INDICATOR_SHARED}
      />
    </ReanimatedView>
  );
};

export default AnketHeader;
