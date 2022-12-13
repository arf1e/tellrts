import React from 'react';

import styles from './Contacts.styles';
import UsersList from './Contacts.UsersList';
import ContactsHeader from './Contacts.Header';
import {View} from 'react-native';
import Reanimated, {Layout} from 'react-native-reanimated';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const Contacts = () => {
  return (
    <AnimatedView layout={Layout} style={styles.container}>
      <ContactsHeader />
      <UsersList />
    </AnimatedView>
  );
};

export default Contacts;
