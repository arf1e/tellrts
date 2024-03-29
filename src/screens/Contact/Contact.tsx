import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CONTACT} from '../../components/Navigation/ContactsNavigator';
import Ankets from './Contact.Ankets';

import styles from './Contact.styles';
import ContactHeader from './ContactHeader';

type ParamList = {
  [CONTACT]: {
    userId: number;
  };
};

const Contact = () => {
  const route = useRoute<RouteProp<ParamList, typeof CONTACT>>();
  const {userId} = route.params;
  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={styles.scrollableContainer}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ContactHeader userId={userId} />
      <Ankets userId={userId} />
    </ScrollView>
  );
};

export default Contact;
