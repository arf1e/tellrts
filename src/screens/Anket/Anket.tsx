import React from 'react';
import {View} from 'react-native';

import styles from './Anket.styles';
import AnketForm from './AnketForm';

const AnketScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.anketElementsContainer}>
        <AnketForm />
      </View>
    </View>
  );
};

export default AnketScreen;
