import React from 'react';
import {BaseToast, ToastProps} from 'react-native-toast-message';
import styles from './Toasts.styles';

interface Props extends ToastProps {
  backgroundColor: string;
  textColor: string;
}

const TellrToast = ({backgroundColor, textColor, ...rest}: Props) => {
  return (
    <BaseToast
      {...rest}
      style={[styles.toastContainer, {backgroundColor}]}
      text1Style={[styles.toastHeadingStyle, {color: textColor}]}
      text2Style={[styles.toastDescriptionStyle, {color: textColor}]}
    />
  );
};

export default TellrToast;
