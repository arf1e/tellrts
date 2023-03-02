import {useMutation} from '@apollo/client';
import {useBottomSheetModal} from '@gorhom/bottom-sheet/src';
import React from 'react';
import {Alert} from 'react-native';
import {SecondaryButton} from '../../components/Buttons';
import errorCatcher, {showInfoToast} from '../../utils/toasts';
import {
  IGNORE_REQUEST_MUTATION,
  IGNORE_REQUEST_RESULT,
  IGNORE_REQUEST_VARIABLES,
  INCOMING_REQUESTS_QUERY,
} from './IncomingRequests.graphql';
import styles from './IncomingRequests.styles';

const IgnoreIncomingRequestBtn = ({
  setLoading,
  requestId,
}: {
  setLoading: (value: boolean) => void;
  requestId: number;
}) => {
  const {dismiss: dismissModal} = useBottomSheetModal();
  const [ignoreRequest] = useMutation<
    IGNORE_REQUEST_RESULT,
    IGNORE_REQUEST_VARIABLES
  >(IGNORE_REQUEST_MUTATION, {
    variables: {
      requestId,
    },
    refetchQueries: [INCOMING_REQUESTS_QUERY],
    onCompleted: () => {
      setLoading(false);
      showInfoToast('Got it!', 'Request ignored');
      dismissModal();
    },

    onError: e => {
      setLoading(false);
      errorCatcher(e);
    },
  });

  const handleIgnoreRequest = async () => {
    setLoading(true);
    await ignoreRequest();
  };

  const onButtonPress = () => {
    Alert.alert('Ignore Request', 'Are you sure manchik', [
      {
        text: 'Ignore',
        style: 'destructive',
        onPress: handleIgnoreRequest,
      },
      {text: 'Cancel', style: 'cancel', onPress: () => null},
    ]);
  };
  return (
    <SecondaryButton
      title="Ignore"
      icon="eye-off"
      style={styles.ignoreBtn}
      onPress={onButtonPress}
    />
  );
};

export default IgnoreIncomingRequestBtn;
