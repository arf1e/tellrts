import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import Lines from '../../components/Lines/Lines';
import Statistics from '../../components/Statistics/Statistics';
import {PROFILE_QUERY} from './Profile.graphql';
import ProfileHeader from './Profile.Header';
import styles from './Profile.styles';

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {refetch} = useQuery(PROFILE_QUERY);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
      setRefreshing(false);
      return;
    } catch (e) {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      style={styles.profileContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ProfileHeader />
      <Lines />
      <Statistics />
    </ScrollView>
  );
};

export default Profile;
