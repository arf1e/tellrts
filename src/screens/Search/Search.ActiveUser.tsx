import {useLazyQuery} from '@apollo/client';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, View} from 'react-native';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import {BodyCopy} from '../../components/Typography';
import useFiniteState from '../../hooks/useFiniteState';
import {Anket, GetAnketResult, GET_ANKET_QUERY, User} from './Search.graphql';
import styles from './Search.styles';

const ActiveUser = ({
  user,
  onClose,
  onProceed,
}: {
  user: User;
  onClose: () => void;
  onProceed: (anket: Anket) => void;
}) => {
  const {t} = useTranslation();

  const [state, {setLoading, setError, setIdle}, _, {LOADING}] =
    useFiniteState();

  const [getAnket] = useLazyQuery<GetAnketResult>(GET_ANKET_QUERY, {
    onCompleted: async data => {
      await setIdle();
      const anket = data.getAnket;
      onProceed(anket);
    },
    onError(error) {
      setError(error.message);
    },
  });

  const handleChooseUser = async () => {
    setLoading();
    await getAnket({variables: {id: user.id}});
  };

  return (
    <View style={styles.activeUserModalContainer}>
      <View style={styles.activeUserModalContent}>
        <Image source={{uri: user.photo}} style={styles.activeUserModalPhoto} />
        <BodyCopy style={styles.activeUserModalBioTitle}>
          {t('app.search.modalBio')}
        </BodyCopy>
        <ScrollView style={styles.activeUserModalBioContainer}>
          <BodyCopy style={styles.activeUserModalBio}>
            {user.bio ||
              'lorem ipsum dolor sit amet lorem ipsum dolor sit amet'}
          </BodyCopy>
        </ScrollView>
      </View>
      <View style={styles.activeUserModalControls}>
        <SecondaryButton
          onPress={onClose}
          title={t('app.search.modalGoBack')}
          style={styles.activeUserModalCancelButton}
        />
        <PrimaryButton
          onPress={handleChooseUser}
          loading={state === LOADING}
          title={t('app.search.modalStart')}
          style={styles.activeUserModalPrimaryButton}
        />
      </View>
    </View>
  );
};

export default ActiveUser;
