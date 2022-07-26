import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Container from '../Container';
import DismissKeyboard from '../DismissKeyboard';
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

  const renderRightButton = () => {
    const {rightButtonTitle, onPressRightButton} = options;
    if (!rightButtonTitle || !onPressRightButton) {
      return null;
    }

    return <Link onPress={onPressRightButton}>{rightButtonTitle}</Link>;
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.background}>
        <Container>
          <View style={styles.headerContainer}>
            <View style={styles.topLineContainer}>
              {renderBackButton()}
              {renderRightButton()}
            </View>
            <Subtitle style={styles.screenTitle}>
              {options.title ?? route.name}
            </Subtitle>
          </View>
        </Container>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default Header;
