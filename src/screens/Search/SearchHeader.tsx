import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, View} from 'react-native';
import Container from '../../components/Container';
import HeaderStyles from '../../components/Header/Header.styles';
import {BodyCopy, Subtitle} from '../../components/Typography';

export default ({}) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={HeaderStyles.background}>
      <Container>
        <View style={HeaderStyles.headerContainer}>
          <Subtitle style={HeaderStyles.screenTitle}>
            {t('navigation.SEARCH')}
          </Subtitle>
        </View>
      </Container>
    </SafeAreaView>
  );
};
