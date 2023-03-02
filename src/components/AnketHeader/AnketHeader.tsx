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
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {AnketState} from '../../utils/slices/anketSlice';
import PhotosBioScroller from '../PhotosBioScroller';

const AnketHeader = () => {
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  if (anket) {
    return (
      <PhotosBioScroller
        slides={[
          {type: 'image', url: anket?.photo},
          {type: 'text', content: anket?.bio},
        ]}
      />
    );
  }
};

export default AnketHeader;
