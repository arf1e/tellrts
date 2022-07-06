import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Container from '../Container';
import Link, {ArrowLink} from '../Links';
import {Subtitle} from '../Typography';
import styles from './Header.styles';

const Header = (props: NativeStackHeaderProps) => {
  const {navigation, back, route, options} = props;
  const {t} = useTranslation();

  const renderBackButton = () => {
    return (
      back && (
        <ArrowLink onPress={navigation.goBack}>
          {options.headerBackTitle || back.title || t('app.navigation.goBack')}
        </ArrowLink>
      )
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <Container>
        <View style={styles.headerContainer}>
          {renderBackButton()}
          <Subtitle style={styles.screenTitle}>
            {options.title ?? route.name}
          </Subtitle>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default Header;
