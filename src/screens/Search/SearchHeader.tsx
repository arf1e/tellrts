import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, View} from 'react-native';
import Container from '../../components/Container';
import HeaderStyles from '../../components/Header/Header.styles';
import Link, {ArrowLink} from '../../components/Links';
import {
  INCOMING_REQUESTS,
  SEARCH_PARAMETERS,
} from '../../components/Navigation/SearchNavigator';
import {Subtitle} from '../../components/Typography';

export default ({}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={HeaderStyles.background}>
      <Container>
        <View style={HeaderStyles.headerContainer}>
          <View style={HeaderStyles.topLineContainer}>
            <Subtitle style={HeaderStyles.screenTitle}>
              {t('navigation.SEARCH')}
            </Subtitle>
            <ArrowLink
              arrowPosition="forward"
              onPress={() => navigation.navigate(INCOMING_REQUESTS)}>
              Incoming Requests
            </ArrowLink>
          </View>
          <Link
            onPress={() => navigation.navigate(SEARCH_PARAMETERS)}
            containerStyle={HeaderStyles.optionContainer}>
            {t('app.search.params.link')}
          </Link>
        </View>
      </Container>
    </SafeAreaView>
  );
};
