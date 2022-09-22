import React from 'react';
import {Image, View} from 'react-native';
import styles from './Profile.styles';

const ProfileError = () => {
  return (
    <View style={styles.profileErrorContainer}>
      <Image
        source={require('../../assets/error.png')}
        style={styles.profileErrorImage}
      />
    </View>
  );
};

export default ProfileError;
