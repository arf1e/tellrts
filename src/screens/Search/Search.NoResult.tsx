import React from 'react';
import {Image, View} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import Reanimated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import styles from './Search.styles';
import {SecondaryButton} from '../../components/Buttons';

const ReanimatedView = Reanimated.createAnimatedComponent(View);
const AnimatedImage = Reanimated.createAnimatedComponent(Image);

const NoSearchResult = () => {
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
        <BodyCopy style={styles.noResultTitle}>Совсем никого нет!</BodyCopy>
        <BodyCopy style={styles.noResultDescription}>
          Мы не смогли найти никого по заданным параметрам поиска. Вы можете
          изменить их, перейдя в настройки, или подождать, пока наше приложение
          станет чуть более популярным.
        </BodyCopy>
        <SecondaryButton
          style={styles.noResultButton}
          title="Открыть настройки поиска"
        />
      </View>
    </ReanimatedView>
  );
};

export default NoSearchResult;
