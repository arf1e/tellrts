import React from 'react';
import {View, Image} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import Reanimated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

import styles from './Search.styles';
import {useTranslation} from 'react-i18next';

type Props = {
  error?: string;
};

const SearchErrored = ({error}: Props) => {
  const {t} = useTranslation();
  return (
    <ReanimatedView
      entering={FadeInDown.duration(240)}
      exiting={FadeOutDown.duration(240)}
      style={styles.noResultContainer}>
      <View style={styles.noResultContent}>
        <Image
          source={require('../../assets/error.png')}
          style={styles.noResultImage}
          resizeMode="contain"
        />
        <BodyCopy style={styles.noResultTitle}>
          {t('app.search.error.title')}
        </BodyCopy>
        <BodyCopy style={styles.noResultDescription}>
          {t('app.search.error.description')}
        </BodyCopy>
      </View>
    </ReanimatedView>
  );
};

export default SearchErrored;
