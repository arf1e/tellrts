import {NetworkError} from '@apollo/client/errors';
import {GraphQLError} from 'graphql';
import Toast from 'react-native-toast-message';

const errorCatcher = (
  e: NetworkError | GraphQLError | any,
  manualError?: {title: string; message: string},
) => {
  Toast.show({
    type: 'error',
    text1: e.name || manualError?.title,
    text2: e.message || manualError?.message,
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
