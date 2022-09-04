import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, FlatList, Pressable, Image} from 'react-native';
import {CONTACT} from '../../components/Navigation/ContactsNavigator';

import {BodyCopy} from '../../components/Typography';
import {GetContactsResult, GET_CONTACTS_QUERY} from './Contacts.graphql';
import styles from './Contacts.styles';
import UserLine from './Contacts.UserLine';

const UsersList = () => {
  const {
    data,
    loading,
    error,
    refetch: refreshUsersList,
  } = useQuery<GetContactsResult>(GET_CONTACTS_QUERY);

  const navigation = useNavigation();

  if (error) {
    return <BodyCopy>error)</BodyCopy>;
  }

  const handleUserPress = (userId: number) => {
    navigation.navigate(CONTACT, {userId});
  };

  return (
    <View style={styles.usersListContainer}>
      <FlatList
        data={data?.findContacts}
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
    </View>
  );
};

export default UsersList;
