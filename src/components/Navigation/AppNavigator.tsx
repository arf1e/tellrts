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
import {useDispatch} from 'react-redux';
import {saveToken} from '../../utils/slices/firebaseTokenSlice';
import Toast from 'react-native-toast-message';
import SearchNavigator from './SearchNavigator';

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
  const dispatch = useDispatch();

  // PUSH NOTIFICATIONS
  const [sendTokenToApi] = useMutation(SEND_DEVICE_TOKEN_TO_API);

  useEffect(() => {
    // TODO: Handle offline/errors
    const aquireDeviceTokenAndSendToApi = async () => {
      const token = await messaging().getToken();
      dispatch(saveToken({firebaseToken: token}));
      sendTokenToApi({variables: {token}});
    };

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {notification} = remoteMessage;
      const [title, body] = [notification?.title, notification?.body];
      if (notification) {
        Toast.show({type: 'info', text1: title, text2: body});
      }
    });

    aquireDeviceTokenAndSendToApi().catch(e => errorCatcher(e));

    return unsubscribe;
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
        component={SearchNavigator}
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
