import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {Subtitle} from '../../components/Typography';

const RequestResult = () => {
  const params = useRoute().params;
  return (
    <View>
      <Subtitle>Result Screen!</Subtitle>
      <Text>{JSON.stringify(params)}</Text>
    </View>
  );
};

export default RequestResult;
