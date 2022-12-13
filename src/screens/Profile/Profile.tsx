import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StatusBar, View} from 'react-native';
import Reanimated, {FadeIn} from 'react-native-reanimated';
import Lines from '../../components/Lines/Lines';
import LoadingIndicator from '../../components/LoadingIndicator';
import {ScreenCap} from '../../components/ScreenCap';
import Statistics from '../../components/Statistics/Statistics';
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
  const {t} = useTranslation();
  const {refetch} = useQuery<ProfileQueryResponse>(PROFILE_QUERY, {
    onCompleted: data => {
      if (data.me) {
        setScreenState(IDLE);
        return;
      }

      setScreenState(ERROR);
    },

    onError: () => {
      setScreenState(ERROR);
    },
  });
  return (
    <ScrollView
      style={styles.profileContainer}
      contentContainerStyle={styles.profileContentContainer}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      {screenState === INITIAL && <LoadingIndicator />}
      {screenState === IDLE && (
        <ReanimatedView entering={FadeIn.duration(320)}>
          <ProfileHeader />
          <Lines />
          <Statistics />
        </ReanimatedView>
      )}
      {screenState === ERROR && (
        <ScreenCap
          title={t('app.profile.errorCap.title')}
          description={t('app.profile.errorCap.description')}
          image="error"
        />
      )}
    </ScrollView>
  );
};

export default Profile;
