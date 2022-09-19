import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Container from '../../components/Container';
import Link from '../../components/Links';
import LoadingIndicator from '../../components/LoadingIndicator';
import {UPDATE_BIO} from '../../components/Navigation/ProfileNavigator';
import {BodyCopy, Subtitle} from '../../components/Typography';
import getAge from '../../utils/getAge';
import {PrimaryInfoData, PRIMARY_INFO_QUERY} from './Profile.graphql';
import styles from './Profile.styles';

const PrimaryInfo = () => {
  const [isErrored, setIsErrored] = useState(false);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {
    loading: primaryInfoLoading,
    data: primaryInfoData,
    error,
  } = useQuery<PrimaryInfoData>(PRIMARY_INFO_QUERY, {
    onError: () => {
      setIsErrored(true);
    },
  });

  const name = primaryInfoData?.me.name;
  const birthday = primaryInfoData?.me.birthday;
  const cityTitle = primaryInfoData?.me.cityTitle;
  const bio = primaryInfoData?.me.bio;
  const age = birthday && getAge(birthday);
  if (primaryInfoLoading) {
    return <LoadingIndicator />;
  }
  return (
    <Container>
      <Subtitle style={styles.primaryInfo}>{`${name}, ${age}`}</Subtitle>
      <BodyCopy style={styles.cityTitle}>{cityTitle || ''}</BodyCopy>
      {bio ? (
        <BodyCopy style={styles.bio}>{bio}</BodyCopy>
      ) : (
        <Link onPress={() => navigation.navigate(UPDATE_BIO)}>
          {t('app.profile.setBio')}
        </Link>
      )}
    </Container>
  );
};

export default PrimaryInfo;
