import React from 'react';
import {Image, Pressable, View} from 'react-native';
import Container from '../../components/Container';
import {BodyCopy} from '../../components/Typography';
import {User} from '../Search/Search.graphql';
import styles from './Contacts.styles';

const UserLine = ({user, onPress}: {user: User; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress} style={styles.userLineContainer}>
      <Container>
        <View style={styles.userLineContent}>
          <Image source={{uri: user.photo}} style={styles.userLinePhoto} />
          <View style={styles.userLineInfo}>
            <BodyCopy style={styles.userLineName}>{user.name}</BodyCopy>
            <BodyCopy style={styles.userLineCity}>{user.cityTitle}</BodyCopy>
          </View>
        </View>
      </Container>
    </Pressable>
  );
};

export default UserLine;
