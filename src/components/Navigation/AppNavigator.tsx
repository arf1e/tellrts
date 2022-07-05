import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../../screens/Search/Search';
import Contacts from '../../screens/Contacts';
import ProfileNavigator from './ProfileNavigator';
import NavigationIcon from './NavigationIcon';
import NavigationStyles from './NavigationStyles';
import {BodyCopy} from '../Typography';
import messaging from '@react-native-firebase/messaging';
import errorCatcher from '../../utils/toasts';
import {gql, useMutation} from '@apollo/client';

const AppTabs = createBottomTabNavigator();

export const PROFILE_NAVIGATOR = 'Profile';
export const SEARCH = 'Search';
export const CONTACTS = 'Contacts';

const SEND_DEVICE_TOKEN_TO_API = gql`
  mutation AddDeviceToken($token: String!) {
    addDeviceToken(token: $token) {
      ok
      error
    }
  }
`;

const AppNavigator = () => {
  const [sendTokenToApi, {data, loading, error}] = useMutation(
    SEND_DEVICE_TOKEN_TO_API,
  );
  useEffect(() => {
    const aquireDeviceTokenAndSendToApi = async () => {
      const token = await messaging().getToken();
      sendTokenToApi({variables: {token}});
      console.warn(token);
    };

    aquireDeviceTokenAndSendToApi().catch(e => errorCatcher(e));
  }, []);

  return (
    <AppTabs.Navigator
      screenOptions={{
        header: () => null,
        tabBarHideOnKeyboard: true,
      }}>
      <AppTabs.Screen
        name={PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{
          tabBarIcon: props => {
            return (
              <NavigationIcon focused={props.focused} name="person-circle" />
            );
          },
          tabBarIconStyle: null,
          tabBarLabel(props) {
            return (
              <BodyCopy
                style={[
                  NavigationStyles.label,
                  props.focused && NavigationStyles.labelActive,
                ]}>
                {PROFILE_NAVIGATOR}
              </BodyCopy>
            );
          },
        }}
      />
      <AppTabs.Screen
        name={SEARCH}
        component={Search}
        options={{
          tabBarIcon: props => {
            return <NavigationIcon focused={props.focused} name="grid" />;
          },
          tabBarLabel(props) {
            return (
              <BodyCopy
                style={[
                  NavigationStyles.label,
                  props.focused && NavigationStyles.labelActive,
                ]}>
                {SEARCH}
              </BodyCopy>
            );
          },
        }}
      />
      <AppTabs.Screen
        name={CONTACTS}
        component={Contacts}
        options={{
          tabBarIcon: props => {
            return <NavigationIcon focused={props.focused} name="list" />;
          },
          tabBarLabel(props) {
            return (
              <BodyCopy
                style={[
                  NavigationStyles.label,
                  props.focused && NavigationStyles.labelActive,
                ]}>
                {CONTACTS}
              </BodyCopy>
            );
          },
        }}
      />
    </AppTabs.Navigator>
  );
};

export default AppNavigator;
