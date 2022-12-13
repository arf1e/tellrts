import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {User} from './Search.graphql';
import styles from './Search.styles';
import Reanimated, {FadeIn, FadeOut} from 'react-native-reanimated';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const UserCard = ({user, onPress}: {user: User; onPress: () => void}) => {
  return (
    <AnimatedPressable entering={FadeIn} exiting={FadeOut} onPress={onPress}>
      <View style={styles.userCardContainer}>
        <Image source={{uri: user.photo}} style={styles.userCardImage} />
      </View>
    </AnimatedPressable>
  );
};

export default UserCard;
