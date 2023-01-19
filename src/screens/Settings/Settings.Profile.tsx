import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import SettingsSection from './SettingsSection';
import {useQuery} from '@apollo/client';
import {SETTINGS_ME_QUERY} from './Settings.graphql';
import LoadingIndicator from '../../components/LoadingIndicator';
import errorCatcher from '../../utils/toasts';
import {
  UPDATE_BIO,
  UPDATE_CITY,
  UPDATE_PHOTO,
} from '../../components/Navigation/ProfileNavigator';

const ProfileSettings = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {data: meData, loading: meLoading} = useQuery<{
    me: {id: number; cityTitle: string; email: string};
  }>(SETTINGS_ME_QUERY, {
    onError: () => {
      errorCatcher({
        name: t('app.settings.profile.errorMessage.title'),
        message: t('app.settings.profile.errorMessage.message'),
      });
    },
  });

  if (meLoading) {
    return <LoadingIndicator />;
  }
  return (
    <SettingsSection
      title={t('app.settings.profile.title')}
      links={[
        {
          linkTitle: t('app.settings.photo.changePhoto'),
          onPress: () => navigation.navigate(UPDATE_PHOTO),
        },
        {
          linkTitle: t('app.settings.bio.changeBio'),
          onPress: () => navigation.navigate(UPDATE_BIO),
        },
        {
          title: t('app.settings.profile.city'),
          linkTitle:
            meData?.me.cityTitle || t('app.settings.profile.cityHolder'),
          onPress: () => navigation.navigate(UPDATE_CITY),
        },
      ]}
    />
  );
};

export default ProfileSettings;
