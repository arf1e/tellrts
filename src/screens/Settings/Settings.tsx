import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  SOCIALS,
  UPDATE_BIO,
  UPDATE_PHOTO,
} from '../../components/Navigation/ProfileNavigator';
import colors from '../../utils/colors';
import {clearAnket} from '../../utils/slices/anketSlice';
import {logOut} from '../../utils/slices/authSlice';
import {store} from '../../utils/store';
import errorCatcher from '../../utils/toasts';
import {LogoutMutationResult, LOGOUT_MUTATION} from './Settings.graphql';
import ProfileSettings from './Settings.Profile';
import styles from './Settings.styles';
import SettingsSection from './SettingsSection';

const Settings = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [logoutMutation, {loading, error, data}] =
    useMutation<LogoutMutationResult>(LOGOUT_MUTATION);

  const onLogout = async () => {
    const {firebaseToken} = store.getState().firebase;
    try {
      await logoutMutation({variables: {token: firebaseToken}});
      dispatch(clearAnket());
      dispatch(logOut());
    } catch (e) {
      errorCatcher(e);
    }
  };

  const askIfUserWantsToLogout = () =>
    Alert.alert(
      t('app.settings.confirmLogoutTitle'),
      t('app.settings.confirmLogoutDesc'),
      [
        {
          text: t('app.settings.cancelLogout'),
          style: 'cancel',
          onPress: () => null,
        },
        {
          text: t('app.settings.confirmLogout'),
          style: 'destructive',
          onPress: onLogout,
        },
      ],
    );
  return (
    <ScrollView style={styles.screenContainer}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SettingsSection
        title={t('app.settings.photo.title')}
        links={[
          {
            linkTitle: t('app.settings.photo.changePhoto'),
            onPress: () => navigation.navigate(UPDATE_PHOTO),
          },
        ]}
      />
      <SettingsSection
        title={t('app.settings.bio.title')}
        links={[
          {
            linkTitle: t('app.settings.bio.changeBio'),
            onPress: () => navigation.navigate(UPDATE_BIO),
          },
        ]}
      />
      <SettingsSection
        title={t('app.settings.socialLinks.title')}
        links={[
          {
            linkTitle: t('app.settings.socialLinks.addLink'),
            onPress: () => navigation.navigate(SOCIALS),
          },
        ]}
      />
      <ProfileSettings askIfUserWantsToLogout={askIfUserWantsToLogout} />
    </ScrollView>
  );
};

export default Settings;
