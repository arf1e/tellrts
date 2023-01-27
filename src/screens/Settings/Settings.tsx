import {useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  SOCIALS,
  UPDATE_BIO,
  UPDATE_CITY,
  UPDATE_LANGUAGE,
  UPDATE_PASSWORD,
  UPDATE_PHOTO,
} from '../../components/Navigation/ProfileNavigator';
import colors from '../../utils/colors';
import {clearAnket} from '../../utils/slices/anketSlice';
import {logOut} from '../../utils/slices/authSlice';
import {store} from '../../utils/store';
import errorCatcher from '../../utils/toasts';
import {
  LogoutMutationResult,
  LOGOUT_MUTATION,
  SETTINGS_ME_QUERY,
} from './Settings.graphql';
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
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={styles.screenContentContainer}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SettingsSection
        title={t('app.settings.profile.settingsTitle')}
        links={[
          {
            linkTitle: t('app.settings.profile.photos'),
            icon: 'image',
            //@ts-ignore
            onPress: () => navigation.navigate(UPDATE_PHOTO),
          },
          {
            linkTitle: t('app.settings.profile.bio'),
            icon: 'ionicons/text',
            //@ts-ignore
            onPress: () => navigation.navigate(UPDATE_BIO),
          },
          {
            linkTitle: t('app.settings.profile.profession'),
            icon: 'briefcase',
            onPress: () => console.warn('Profession'),
          },
          {
            linkTitle: t('app.settings.profile.city'),
            icon: 'map-pin',
            //@ts-ignore
            onPress: () => navigation.navigate(UPDATE_CITY),
          },
          {
            linkTitle: t('app.settings.profile.socialLinks'),
            icon: 'share-2',
            //@ts-ignore
            onPress: () => navigation.navigate(SOCIALS),
          },
        ]}
      />
      <SettingsSection
        title={t('app.settings.app.title')}
        links={[
          {
            linkTitle: t('app.settings.app.language'),
            // @ts-ignore
            onPress: () => navigation.navigate(UPDATE_LANGUAGE),
          },
          {
            linkTitle: t('app.settings.app.email'),
            onPress: () => console.warn('Email'),
          },
          {
            linkTitle: t('app.settings.profile.changePassword'),
            // @ts-ignore
            onPress: () => navigation.navigate(UPDATE_PASSWORD),
          },
          {
            linkTitle: t('app.settings.profile.logout'),
            onPress: askIfUserWantsToLogout,
            additionalStyle: styles.logoutLink,
          },
        ]}
      />
    </ScrollView>
  );
};

export default Settings;
