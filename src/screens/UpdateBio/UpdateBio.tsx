import {useQuery} from '@apollo/client';
import React from 'react';

import styles from './UpdateBio.styles';
import {GetBioQueryResult, GET_BIO_QUERY} from './UpdateBio.graphql';
import {KeyboardAvoidingView} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import {conditionallyRenderComponent} from '../../components/LoadingIndicator';
import InputBio from './InputBio';
import errorCatcher from '../../utils/toasts';
import {useTranslation} from 'react-i18next';

const UpdateBio = () => {
  const {t} = useTranslation();
  const {loading: getBioLoading, data: getBioQueryData} =
    useQuery<GetBioQueryResult>(GET_BIO_QUERY, {
      onError: error =>
        errorCatcher(error, {
          title: t('app.settings.bio.errorMessage'),
          message: t('app.settings.errorMessage.body'),
        }),
    });

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        {conditionallyRenderComponent(
          <InputBio bio={getBioQueryData?.me.bio || ''} />,
          getBioLoading,
        )}
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

export default UpdateBio;
