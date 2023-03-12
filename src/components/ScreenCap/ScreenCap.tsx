import React from 'react';
import {View, Image} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import Reanimated, {FadeIn, FadeOut} from 'react-native-reanimated';
import styles from './ScreenCap.styles';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

const imageSourceMapper = {
  error: require('../../assets/error.png'),
  'no-result': require('../../assets/no-result.png'),
};

type Props = {
  error?: string;
  title: string;
  description: string;
  image: 'error' | 'no-result';
};

const SearchErrored = ({error, title, description, image}: Props) => {
  return (
    <ReanimatedView
      entering={FadeIn.duration(240)}
      exiting={FadeOut.duration(240)}
      style={styles.noResultContainer}>
      <View style={styles.noResultContent}>
        <Image
          source={imageSourceMapper[image]}
          style={styles.noResultImage}
          resizeMode="contain"
        />
        <BodyCopy style={styles.noResultTitle}>{title}</BodyCopy>
        <BodyCopy style={styles.noResultDescription}>{description}</BodyCopy>
      </View>
    </ReanimatedView>
  );
};

export default SearchErrored;
