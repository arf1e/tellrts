import React from 'react';
import {ToastProps} from 'react-native-toast-message';
import Error from './Error';
import Info from './Info';
import Success from './Success';

const config = {
  info: (props: ToastProps) => <Info {...props} />,
  success: (props: ToastProps) => <Success {...props} />,
  error: (props: ToastProps) => <Error {...props} />,
};

export default config;
