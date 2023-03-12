import React from 'react';
import {useSelector} from 'react-redux';
import {AuthState} from '../../utils/slices/authSlice';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
  /**
   * Renders Sign Up / Sign In flow if there is no token in the async storage. If there is a token, renders App flow.
   */
  const token = useSelector((state: {auth: AuthState}) => state.auth.token);
  const isLoggedIn = token !== null;
  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
