import React from 'react';
import Reanimated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import {Image, Pressable, View} from 'react-native';
import Container from '../../components/Container';
import {BodyCopy} from '../../components/Typography';
import {User} from '../Search/Search.graphql';
import styles from './Contacts.styles';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const UserIcon = ({user, onPress}: {user: User; onPress: () => void}) => {
  return (
    <AnimatedPressable
      layout={Layout.springify()}
      entering={FadeIn}
      exiting={FadeOut}
      onPress={onPress}
      style={styles.userLineContainer}>
      <Container>
        <View style={styles.userLineContent}>
          <Image source={{uri: user.photo}} style={styles.userLinePhoto} />
          <View style={styles.userLineInfo}>
            <BodyCopy style={styles.userLineName}>{user.name}</BodyCopy>
            <BodyCopy style={styles.userLineCity}>{user.cityTitle}</BodyCopy>
          </View>
        </View>
      </Container>
    </AnimatedPressable>
  );
};

export default UserIcon;
