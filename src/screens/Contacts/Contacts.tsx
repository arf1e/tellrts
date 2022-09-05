import {useLazyQuery, useQuery} from '@apollo/client';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './Contacts.styles';
import PrimaryButton from '../../components/Buttons';
import {BodyCopy, Subtitle, Title} from '../../components/Typography';
import {GET_CONTACTS_QUERY} from './Contacts.graphql';
import HeaderStyles from '../../components/Header/Header.styles';
import Container from '../../components/Container';
import UsersList from './Contacts.UsersList';

const Contacts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <Container>
          <Subtitle style={HeaderStyles.screenTitle}>Contacts</Subtitle>
        </Container>
      </View>
      <UsersList />
    </SafeAreaView>
  );
};

export default Contacts;
