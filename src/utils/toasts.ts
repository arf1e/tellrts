import {NetworkError} from '@apollo/client/errors';
import {GraphQLError} from 'graphql';
import Toast from 'react-native-toast-message';

const errorCatcher = (e: NetworkError | GraphQLError | any) => {
  Toast.show({type: 'error', text1: e?.name, text2: e?.message});
};

export default errorCatcher;
