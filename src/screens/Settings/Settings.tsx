import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  UPDATE_BIO,
  UPDATE_PASSWORD,
  UPDATE_PHOTO,
} from '../../components/Navigation/ProfileNavigator';
import colors from '../../utils/colors';
import {logOut} from '../../utils/slices/authSlice';
import {store} from '../../utils/store';
import errorCatcher from '../../utils/toasts';
import {LogoutMutationResult, LOGOUT_MUTATION} from './Settings.graphql';
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
    console.log('ftoken', firebaseToken);
    try {
      await logoutMutation({variables: {token: firebaseToken}});
      dispatch(logOut());
    } catch (e) {
      console.log(e);
      errorCatcher(e);
    }
  };

  const AskIfUserWantsToLogout = () =>
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
            onPress: () => console.warn('Social'),
          },
        ]}
      />
      <SettingsSection
        title={t('app.settings.profile.title')}
        links={[
          {
            title: t('app.settings.profile.email'),
            linkTitle: 'egor@egor.com',
            onPress: () => console.warn('Email'),
          },
          {
            title: t('app.settings.profile.city'),
            linkTitle: 'Russia, Saint-Petersburg',
            onPress: () => console.warn('City'),
          },
          {
            linkTitle: t('app.settings.profile.changePassword'),
            onPress: () => navigation.navigate(UPDATE_PASSWORD),
          },
          {
            linkTitle: t('app.settings.profile.logout'),
            onPress: AskIfUserWantsToLogout,
            additionalStyle: styles.logoutLink,
          },
        ]}
      />
    </ScrollView>
  );
};

export default Settings;
