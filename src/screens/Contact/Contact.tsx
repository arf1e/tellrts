import {useQuery} from '@apollo/client';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import PrimaryButton from '../../components/Buttons';
import {CHAT} from '../../components/Navigation/ContactsNavigator';
import {BodyCopy} from '../../components/Typography';
import {GetContactResult, GET_CONTACT_QUERY} from './Contact.graphql';

import styles from './Contact.styles';

const Contact = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {loading, data} = useQuery<{userId: number}, GetContactResult>(
    GET_CONTACT_QUERY,
    {
      variables: {
        userId: route.params.userId,
      },
    },
  );

  const handleNavigateToChat = () => {
    navigation.navigate(CHAT, {userId: route.params.userId});
  };
  return (
    <ScrollView style={styles.screenContainer}>
      <BodyCopy>{JSON.stringify(data)}</BodyCopy>
      <PrimaryButton title="в чат" onPress={handleNavigateToChat} />
    </ScrollView>
  );
};

export default Contact;
