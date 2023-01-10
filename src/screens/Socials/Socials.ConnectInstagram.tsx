import {useQuery} from '@apollo/client';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Linking} from 'react-native';
import Link from '../../components/Links';
import colors from '../../utils/colors';
import {GET_INSTAGRAM_LINK_QUERY} from './Socials.graphql';

const ConnectInstagram = () => {
  const {data, loading} = useQuery<{getInstagramLink: string}>(
    GET_INSTAGRAM_LINK_QUERY,
  );
  const {t} = useTranslation();

  if (loading) {
    return <ActivityIndicator size="small" color={colors.primary} />;
  }

  return (
    <Link onPress={() => Linking.openURL(data?.getInstagramLink)}>
      {t('app.settings.socialLinks.noCurrentInstagramAttached')}
    </Link>
  );
};

export default ConnectInstagram;
