import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import SettingsSection from './SettingsSection';
import styles from './Settings.styles';
import {useQuery} from '@apollo/client';
import {SETTINGS_ME_QUERY} from './Settings.graphql';
import LoadingIndicator from '../../components/LoadingIndicator';
import errorCatcher from '../../utils/toasts';
import {
  UPDATE_BIO,
  UPDATE_CITY,
  UPDATE_PASSWORD,
  UPDATE_PHOTO,
} from '../../components/Navigation/ProfileNavigator';

type Props = {
  askIfUserWantsToLogout: () => void;
};

const AccountSettings = ({askIfUserWantsToLogout}: Props) => {
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
      title={t('app.settings.account.title')}
      links={[
        {
          title: t('app.settings.profile.email'),
          linkTitle: meData?.me.email || t('app.settings.profile.emailHolder'),
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
  );
};

export default AccountSettings;
