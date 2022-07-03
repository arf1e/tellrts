import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, StatusBar, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Link from '../../components/Links';
import {Title} from '../../components/Typography';
import colors from '../../utils/colors';
import {logOut} from '../../utils/slices/authSlice';
import styles from './Settings.styles';
import SettingsSection from './SettingsSection';

const Settings = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
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
          onPress: () => dispatch(logOut()),
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
            onPress: () => console.warn('Change Photo'),
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
            onPress: () => console.warn('change pwd'),
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
