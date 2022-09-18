import React from 'react';
import {ToastProps} from 'react-native-toast-message';
import colors from '../../utils/colors';
import TellrToast from './TellrToast';

const Info = (props: ToastProps) => {
  return (
    <TellrToast
      {...props}
      backgroundColor={colors.background}
      textColor={colors.black}
    />
  );
};

export default Info;
