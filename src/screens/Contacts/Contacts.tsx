import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './Contacts.styles';
import UsersList from './Contacts.UsersList';
import ContactsHeader from './Contacts.Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import colors from '../../utils/colors';
import {Platform, View, ViewProps} from 'react-native';

const Contacts = () => {
  return (
    <View style={styles.container}>
      <ContactsHeader />
      <FocusAwareStatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
      />
      <UsersList />
    </View>
  );
};

export default Contacts;
