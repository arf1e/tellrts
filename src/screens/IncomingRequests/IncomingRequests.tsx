import React from 'react';
import {View} from 'react-native';
import RequestsList from './IncomingRequests.RequestsList';
import styles from './IncomingRequests.styles';

const IncomingRequests = () => {
  return (
    <View style={styles.container}>
      <RequestsList />
    </View>
  );
};

export default IncomingRequests;
