import React from 'react';
import {StatusBar, View} from 'react-native';

import styles from './Anket.styles';
import AnketForm from './AnketForm';

const AnketScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.anketElementsContainer}>
        <AnketForm />
      </View>
    </View>
  );
};

export default AnketScreen;
