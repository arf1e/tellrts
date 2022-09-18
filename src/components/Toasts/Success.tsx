import React from 'react';
import {ToastProps} from 'react-native-toast-message';
import colors from '../../utils/colors';
import TellrToast from './TellrToast';

const Success = (props: ToastProps) => {
  return (
    <TellrToast
      {...props}
      backgroundColor={colors.good}
      textColor={colors.background}
    />
  );
};

export default Success;
