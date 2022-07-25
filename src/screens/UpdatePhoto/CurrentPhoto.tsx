import React from 'react';
import Reanimated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import styles from './UpdatePhoto.styles';
import {PHOTO_QUERY} from '../Profile/Profile.graphql';
import {Image, View} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import {useQuery} from '@apollo/client';
import LoadingIndicator from '../../components/LoadingIndicator';
import animationConstants from '../../utils/animationConstants';

const CurrentPhoto = () => {
  const {error, loading, data} = useQuery(PHOTO_QUERY);
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <BodyCopy>error</BodyCopy>;
  }

  return (
    <View style={styles.currentPhotoContainer}>
      <Image
        source={{uri: data.me.photo}}
        style={styles.currentPhoto}
        defaultSource={require('../../assets/image-cap.png')}
      />
    </View>
  );
};
export default CurrentPhoto;
