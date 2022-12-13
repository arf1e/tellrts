import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, View} from 'react-native';
import Container from '../../components/Container';
import HeaderStyles from '../../components/Header/Header.styles';
import Link from '../../components/Links';
import {SEARCH_PARAMETERS} from '../../components/Navigation/SearchNavigator';
import {Subtitle} from '../../components/Typography';

export default ({}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={HeaderStyles.background}>
      <Container>
        <View style={HeaderStyles.headerContainer}>
          <Subtitle style={HeaderStyles.screenTitle}>
            {t('navigation.SEARCH')}
          </Subtitle>
          <Link onPress={() => navigation.navigate(SEARCH_PARAMETERS)}>
            Параметры
          </Link>
        </View>
      </Container>
    </SafeAreaView>
  );
};
