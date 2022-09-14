import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import Reanimated, {SlideInRight, SlideOutRight} from 'react-native-reanimated';
import Container from '../../components/Container';
import {CONTACT} from '../../components/Navigation/ContactsNavigator';
import {BodyCopy, Subtitle} from '../../components/Typography';
import {User} from '../Search/Search.graphql';
import {GET_RECENT_CONTACTS_QUERY} from './Contacts.graphql';
import styles from './Contacts.styles';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const NewUserCard = ({user}: {user: User}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(CONTACT, {userId: user.id})}
      style={[styles.newContactHolder, styles.newContactContainer]}>
      <Image source={{uri: user.photo}} style={styles.newContactAvatar} />
      <BodyCopy style={styles.newContactName}>{user.name}</BodyCopy>
      <BodyCopy style={styles.newContactCity}>{user.cityTitle}</BodyCopy>
    </Pressable>
  );
};

const NewContacts = () => {
  const {loading, data} = useQuery<{findRecentContacts: User[]}>(
    GET_RECENT_CONTACTS_QUERY,
  );

  if (loading) {
    return <ActivityIndicator size="small" />;
  }

  return (
    <AnimatedView
      entering={SlideInRight}
      exiting={SlideOutRight}
      style={styles.newContactsContainer}>
      <Container>
        <Subtitle style={styles.newContactsHeading}>Новые</Subtitle>
      </Container>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data?.findRecentContacts.map(user => (
          <NewUserCard user={user} />
        ))}
      </ScrollView>
    </AnimatedView>
  );
};

export default NewContacts;
