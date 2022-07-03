import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../../screens/Search/Search';
import Contacts from '../../screens/Contacts';
import ProfileNavigator from './ProfileNavigator';
import NavigationIcon from './NavigationIcon';
import NavigationStyles from './NavigationStyles';
import {BodyCopy} from '../Typography';

const AppTabs = createBottomTabNavigator();

export const PROFILE_NAVIGATOR = 'Profile';
export const SEARCH = 'Search';
export const CONTACTS = 'Contacts';

const AppNavigator = () => {
  return (
    <AppTabs.Navigator
      screenOptions={{
        header: () => null,
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
