import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Container from '../../components/Container';
import HeaderStyles from '../../components/Header/Header.styles';
import {BodyCopy, Subtitle} from '../../components/Typography';

export default ({}) => {
  return (
    <SafeAreaView style={HeaderStyles.background}>
      <Container>
        <View style={HeaderStyles.headerContainer}>
          <Subtitle style={HeaderStyles.screenTitle}>Search</Subtitle>
        </View>
      </Container>
    </SafeAreaView>
  );
};
