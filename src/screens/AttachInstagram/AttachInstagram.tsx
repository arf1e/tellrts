import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  GET_MY_INSTAGRAM_PROFILE_BY_CODE_QUERY,
  GET_MY_INSTAGRAM_RESPONSE_TYPE,
} from './AttachInstagram.graphql';
import styles from './AttachInstagram.styles';
import ConfirmInstagramAttachment from './ConfirmInstagramAttachment';

const Instagram = ({props}) => {
  const route = useRoute();
  const {code} = route.params;

  const {error, loading, data} = useQuery<
    GET_MY_INSTAGRAM_RESPONSE_TYPE,
    {code: string}
  >(GET_MY_INSTAGRAM_PROFILE_BY_CODE_QUERY, {variables: {code}});

  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator />}
      {data?.getMyInstagramProfileByCode.id &&
        data?.getMyInstagramProfileByCode.username && (
          <ConfirmInstagramAttachment
            id={data.getMyInstagramProfileByCode.id}
            username={data.getMyInstagramProfileByCode.username}
          />
        )}
    </View>
  );
};

export default Instagram;
