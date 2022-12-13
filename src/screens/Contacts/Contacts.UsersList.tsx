import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, FlatList, Pressable, Image} from 'react-native';
import {CONTACT} from '../../components/Navigation/ContactsNavigator';

import {BodyCopy} from '../../components/Typography';
import {GetContactsResult, GET_CONTACTS_QUERY} from './Contacts.graphql';
import styles from './Contacts.styles';
import UserLine from './Contacts.UserLine';

import Reanimated, {Layout} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {ContactsInputState} from '../../utils/slices/contactsInputSlice';
import ContactsHeader from './Contacts.Header';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const UsersList = () => {
  const {
    data,
    loading,
    error,
    refetch: refreshUsersList,
  } = useQuery<GetContactsResult>(GET_CONTACTS_QUERY);

  const navigation = useNavigation();
  const {inputValue: contactsInputValue} = useSelector(
    (state: {contactsInput: ContactsInputState}) => state.contactsInput,
  );

  if (error) {
    return <BodyCopy>error)</BodyCopy>;
  }

  const handleUserPress = (userId: number) => {
    navigation.navigate(CONTACT, {userId});
  };

  const getProbablyFilteredUsers = () => {
    if (contactsInputValue) {
      return data?.findContacts.filter(user =>
        user.name.startsWith(contactsInputValue.trim()),
      );
    }

    return data?.findContacts;
  };

  return (
    <AnimatedView layout={Layout.springify()} style={styles.usersListContainer}>
      <FlatList
        data={getProbablyFilteredUsers()}
        onRefresh={refreshUsersList}
        style={{flex: 1, flexGrow: 1}}
        contentContainerStyle={styles.listScrollable}
        refreshing={loading}
        renderItem={({item: user}) => (
          <UserLine
            user={user}
            onPress={() => handleUserPress(user.id)}
            key={user.id}
          />
        )}
      />
    </AnimatedView>
  );
};

export default UsersList;
