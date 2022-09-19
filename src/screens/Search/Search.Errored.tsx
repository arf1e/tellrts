import React from 'react';
import {View, Image} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import Reanimated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

import styles from './Search.styles';

type Props = {
  error?: string;
};

const SearchErrored = ({error}: Props) => {
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
          Нет соединения с сервером.
        </BodyCopy>
        <BodyCopy style={styles.noResultDescription}>
          Мы не получили ответа от сервера. Пожалуйста, проверьте подключение к
          Интернету, а потом потяните вниз, чтобы обновить список пользователей.
        </BodyCopy>
      </View>
    </ReanimatedView>
  );
};

export default SearchErrored;
