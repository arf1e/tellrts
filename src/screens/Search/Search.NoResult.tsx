import React from 'react';
import {Image, View} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import Reanimated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import styles from './Search.styles';
import {SecondaryButton} from '../../components/Buttons';
import {useNavigation} from '@react-navigation/native';
import {SEARCH_PARAMETERS} from '../../components/Navigation/SearchNavigator';
import {useTranslation} from 'react-i18next';

const ReanimatedView = Reanimated.createAnimatedComponent(View);
const AnimatedImage = Reanimated.createAnimatedComponent(Image);

const NoSearchResult = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <ReanimatedView
      entering={FadeInDown.duration(240)}
      exiting={FadeOutDown.duration(240)}
      style={styles.noResultContainer}>
      <View style={styles.noResultContent}>
        <AnimatedImage
          source={require('../../assets/no-result.png')}
          resizeMode="contain"
          style={styles.noResultImage}
        />
        <BodyCopy style={styles.noResultTitle}>
          {t('app.search.noResult.title')}
        </BodyCopy>
        <BodyCopy style={styles.noResultDescription}>
          {t('app.search.noResult.description')}
        </BodyCopy>
        <SecondaryButton
          style={styles.noResultButton}
          title={t('app.search.noResult.btnTitle')}
          onPress={() => navigation.navigate(SEARCH_PARAMETERS)}
        />
      </View>
    </ReanimatedView>
  );
};

export default NoSearchResult;
