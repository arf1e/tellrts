import {useQuery} from '@apollo/client';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import PrimaryButton from '../../components/Buttons';
import {CHAT, CONTACT} from '../../components/Navigation/ContactsNavigator';
import {BodyCopy} from '../../components/Typography';
import {GetContactResult, GET_CONTACT_QUERY} from './Contact.graphql';

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
  const navigation = useNavigation();
  const {loading, data} = useQuery<{userId: number}, GetContactResult>(
    GET_CONTACT_QUERY,
    {
      variables: {
        userId,
      },
    },
  );

  return (
    <ScrollView style={styles.screenContainer}>
      <ContactHeader userId={userId} />
    </ScrollView>
  );
};

export default Contact;
