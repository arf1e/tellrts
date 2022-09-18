import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Container from '../../components/Container';
import Controls from './Controls';
import CurrentPhoto from './CurrentPhoto';
import styles from './UpdatePhoto.styles';
import validationSchema from './schema';
import {useMutation} from '@apollo/client';
import {
  UpdatePhotoMutationResult,
  UPDATE_PHOTO_MUTATION,
} from './UpdatePhoto.graphql';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {PHOTO_QUERY} from '../Profile/Profile.graphql';
import errorCatcher, {showInfoToast} from '../../utils/toasts';
import {generateRNFile} from '../../utils/photo';
import LoadingIndicator from '../../components/LoadingIndicator';
import {useTranslation} from 'react-i18next';

const IDLE = 'IDLE';
const LOADING = 'LOADING';

type UPDATE_PHOTO_STATE = typeof IDLE | typeof LOADING | typeof ERROR;

const UpdatePhoto = () => {
  const [updatePhoto, {reset}] = useMutation<UpdatePhotoMutationResult>(
    UPDATE_PHOTO_MUTATION,
  );
  const {t} = useTranslation();

  const [state, setState] = useState<UPDATE_PHOTO_STATE>(IDLE);

  const handleUpdatePhoto = async (image: ImageOrVideo) => {
    setState(LOADING);
    const photo = await generateRNFile(image);
    console.log('ph', photo);
    await updatePhoto({
      variables: {photo},
      refetchQueries: [PHOTO_QUERY],
      onCompleted: res =>
        showInfoToast(
          t('app.settings.photo.successMessage.title'),
          t('app.settings.photo.successMessage.body'),
        ),
      onError: error => {
        errorCatcher(error, {
          title: t('app.settings.photo.errorMessage.title'),
          message: t('app.settings.photo.errorMessage.body'),
        });
        reset();
      },
    });
    setState(IDLE);
  };

  return (
    <View style={styles.container}>
      <Container>
        {state === IDLE && <CurrentPhoto />}
        {state === IDLE && <Controls updatePhoto={handleUpdatePhoto} />}
        {state === LOADING && <LoadingIndicator />}
      </Container>
    </View>
  );
};

export default UpdatePhoto;
