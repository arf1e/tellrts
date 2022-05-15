import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../../screens/Login/Login';
import Register from '../../screens/Register';

const AuthStackNavigator = createNativeStackNavigator();

export const LOGIN_SCREEN = 'Login';
export const SIGNUP_SCREEN = 'Signup';

const AuthNavigator = () => (
  <AuthStackNavigator.Navigator screenOptions={{header: () => null}}>
    <AuthStackNavigator.Screen name={LOGIN_SCREEN} component={Login} />
    <AuthStackNavigator.Screen
      name={SIGNUP_SCREEN}
      component={Register}
      options={{gestureEnabled: false}}
    />
  </AuthStackNavigator.Navigator>
);

export default AuthNavigator;
