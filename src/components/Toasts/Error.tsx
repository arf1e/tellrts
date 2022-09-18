import React from 'react';
import {ToastProps} from 'react-native-toast-message';
import colors from '../../utils/colors';
import TellrToast from './TellrToast';

const Error = (props: ToastProps) => {
  return (
    <TellrToast
      {...props}
      backgroundColor={colors.bad}
      textColor={colors.background}
    />
  );
};

export default Error;
