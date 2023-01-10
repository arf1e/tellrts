import {NetworkError} from '@apollo/client/errors';
import {GraphQLError} from 'graphql';
import Toast from 'react-native-toast-message';

export const showErrorToast = (
  text1: string,
  text2: string,
  onPress?: () => void,
) => {
  Toast.show({
    type: 'error',
    text1,
    text2,
    onPress,
  });
};

const errorCatcher = (
  e: NetworkError | GraphQLError | any,
  manualError?: {title: string; message: string},
  onPress?: () => void,
) => {
  showErrorToast(
    e.name || manualError?.title,
    e.message || manualError?.message,
    onPress,
  );
};

export const showInfoToast = (
  text1: string,
  text2: string,
  onPress?: () => void,
) => {
  Toast.show({
    type: 'info',
    text1,
    text2,
    position: 'top',
    topOffset: 32,
    onPress,
  });
};

export const showSuccessToast = (
  text1: string,
  text2: string,
  onPress?: () => void,
) => {
  Toast.show({
    type: 'success',
    text1,
    text2,
    position: 'top',
    topOffset: 32,
    onPress,
  });
};

export const errorWrapper = (fn: () => any | void) => {
  try {
    fn();
  } catch (e) {
    errorCatcher(e);
  }
};

export default errorCatcher;
