import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, SafeAreaView, StatusBar, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Reanimated, {FadeIn} from 'react-native-reanimated';
import Lines from '../../components/Lines/Lines';
import LoadingIndicator from '../../components/LoadingIndicator';
import {ScreenCap} from '../../components/ScreenCap';
import Statistics from '../../components/Statistics/Statistics';
import colors from '../../utils/colors';
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

  const handleProfileQueryResponse = (data: ProfileQueryResponse) => {
    if (data.me) {
      setScreenState(IDLE);
      return;
    }

    setScreenState(ERROR);
  };

  const handleProfileQueryError = () => setScreenState(ERROR);

  const {refetch: retryProfileQuery} = useQuery<ProfileQueryResponse>(
    PROFILE_QUERY,
    {
      onCompleted: handleProfileQueryResponse,
      onError: handleProfileQueryError,
    },
  );

  const handleRetryProfileQuery = () => {
    setScreenState(LOADING);
    retryProfileQuery()
      .then(({data}) => handleProfileQueryResponse(data))
      .catch(handleProfileQueryError);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        canCancelContentTouches={false}
        style={styles.profileContainer}
        refreshControl={
          <RefreshControl
            tintColor={colors.secondary}
            refreshing={screenState === LOADING}
            onRefresh={handleRetryProfileQuery}
          />
        }
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
    </SafeAreaView>
  );
};

export default Profile;
