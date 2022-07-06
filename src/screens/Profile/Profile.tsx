import {useQuery} from '@apollo/client';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Lines from '../../components/Lines/Lines';
import Statistics from '../../components/Statistics/Statistics';
import {BodyCopy, Subtitle, Title} from '../../components/Typography';
import colors from '../../utils/colors';
import {logOut} from '../../utils/slices/authSlice';
import {PROFILE_QUERY} from './Profile.graphql';
import ProfileHeader from './Profile.Header';
import styles from './Profile.styles';

const Profile = () => {
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.profileContainer}>
      <ProfileHeader />
      <Lines />
      <Statistics />
    </ScrollView>
  );
};

export default Profile;
