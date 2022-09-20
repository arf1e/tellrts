import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {User} from './Search.graphql';
import styles from './Search.styles';

const UserCard = ({user, onPress}: {user: User; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.userCardContainer}>
        <Image source={{uri: user.photo}} style={styles.userCardImage} />
      </View>
    </Pressable>
  );
};

export default UserCard;
