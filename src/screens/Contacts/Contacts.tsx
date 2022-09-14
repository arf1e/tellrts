import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './Contacts.styles';
import UsersList from './Contacts.UsersList';
import ContactsHeader from './Contacts.Header';
import {View} from 'react-native';

const Contacts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ContactsHeader />
      <UsersList />
    </SafeAreaView>
  );
};

export default Contacts;
