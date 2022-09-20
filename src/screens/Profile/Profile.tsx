import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {RefreshControl, ScrollView, StatusBar, View} from 'react-native';
import Reanimated, {FadeIn} from 'react-native-reanimated';
import Lines from '../../components/Lines/Lines';
import LoadingIndicator from '../../components/LoadingIndicator';
import Statistics from '../../components/Statistics/Statistics';
import {SCROLLABLE_PADDING_BOTTOM} from '../../utils/animationConstants';
import {ProfileQueryResponse, PROFILE_QUERY} from './Profile.graphql';
import ProfileHeader from './Profile.Header';
import styles from './Profile.styles';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

const INITIAL = 'INITIAL';
const LOADING = 'LOADING';
const ERROR = 'ERROR';
const IDLE = 'IDLE';

type SCREEN_STATE =
  | typeof INITIAL
  | typeof LOADING
  | typeof ERROR
  | typeof IDLE;

const Profile = () => {
  const [screenState, setScreenState] = useState<SCREEN_STATE>(INITIAL);
  const {refetch} = useQuery<ProfileQueryResponse>(PROFILE_QUERY, {
    onCompleted: data => {
      if (data.me) {
        setScreenState(IDLE);
        return;
      }

      setScreenState(ERROR);
    },
  });
  const onRefresh = async () => {
    const prevState = screenState;
    if (prevState === INITIAL) {
      setScreenState(LOADING);
    }
    try {
      await refetch().then(({data}) => {
        if (data.me) {
          setScreenState(IDLE);
          return;
        }
        setScreenState(ERROR);
      });
      return;
    } catch (e) {
      setScreenState(ERROR);
    }
  };
  return (
    <ScrollView
      style={styles.profileContainer}
      contentContainerStyle={{paddingBottom: SCROLLABLE_PADDING_BOTTOM}}
      refreshControl={
        <RefreshControl
          refreshing={screenState === LOADING}
          onRefresh={onRefresh}
        />
      }>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      {screenState === INITIAL && <LoadingIndicator />}
      {screenState === IDLE && (
        <ReanimatedView entering={FadeIn.duration(320)}>
          <ProfileHeader />
          <Lines />
          <Statistics />
        </ReanimatedView>
      )}
    </ScrollView>
  );
};

export default Profile;
