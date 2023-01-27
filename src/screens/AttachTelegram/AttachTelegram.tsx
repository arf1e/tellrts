import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Container from '../../components/Container';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  GET_TELEGRAM_CODE_QUERY,
  GET_TELEGRAM_CODE_QUERY_RESULT,
} from './AttachTelegram.graphql';
import styles from './AttachTelegram.styles';
import TelegramCode from './TelegramCode';
import ErrorRetry from '../../components/ErrorRetry/ErrorRetry';

const LOADING = 'LOADING';
const IDLE = 'IDLE';
const ERROR = 'ERROR';

type SCREEN_STATE = typeof LOADING | typeof IDLE | typeof ERROR;

const AttachTelegram = () => {
  const [screenState, setScreenState] = useState<SCREEN_STATE>(LOADING);
  const {t} = useTranslation();
  const [displayError, setDisplayError] = useState<string | null>(null);

  const handleError = (text1: string, text2: string) => {
    setDisplayError(text2);
    setScreenState(ERROR);
    return;
  };

  const setLoading = () => {
    setDisplayError(null);
    setScreenState(LOADING);
  };

  const setIdle = () => {
    setDisplayError(null);
    setScreenState(IDLE);
  };

  const handleCompleted = (data: GET_TELEGRAM_CODE_QUERY_RESULT) => {
    const {error: resolverError} = data.generateTelegramCode;
    if (resolverError) {
      handleError(
        t('app.settings.socialLinks.telegram.humanReadableError'),
        resolverError,
      );
      return;
    }
    setIdle();
    return;
  };

  const {data, refetch} = useQuery<GET_TELEGRAM_CODE_QUERY_RESULT>(
    GET_TELEGRAM_CODE_QUERY,
    {
      onError: () => {
        handleError(
          t('app.settings.socialLinks.telegram.networkError'),
          t('app.settings.socialLinks.telegram.networkErrorDescription'),
        );
        return;
      },
      fetchPolicy: 'network-only',

      onCompleted: queryData => handleCompleted(queryData),
    },
  );

  const retryGenerateCode = async () => {
    setLoading();
    refetch()
      .then(refetchResult => handleCompleted(refetchResult.data))
      .catch(() =>
        handleError(
          t('app.settings.socialLinks.telegram.networkError'),
          t('app.settings.socialLinks.telegram.networkErrorDescription'),
        ),
      );
  };

  return (
    <View style={styles.screen}>
      <Container>
        {screenState === ERROR && (
          <ErrorRetry
            heading={t('app.settings.socialLinks.telegram.errorHeading')}
            description={displayError}
            retryTitle={t('app.settings.socialLinks.telegram.retryButtonTitle')}
            retryOnPress={retryGenerateCode}
          />
        )}
        {screenState === LOADING && <LoadingIndicator />}
        {screenState === IDLE && data?.generateTelegramCode.code && (
          <TelegramCode code={data.generateTelegramCode.code} />
        )}
      </Container>
    </View>
  );
};

export default AttachTelegram;
