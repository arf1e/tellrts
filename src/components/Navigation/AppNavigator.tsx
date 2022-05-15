import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../screens/Profile';
import Search from '../../screens/Search/Search';
import Contacts from '../../screens/Contacts';

const AppTabs = createBottomTabNavigator();

export const PROFILE = 'Profile';
export const SEARCH = 'Search';
export const CONTACTS = 'Contacts';

const AppNavigator = () => {
  return (
    <AppTabs.Navigator screenOptions={{header: () => null}}>
      <AppTabs.Screen name={PROFILE} component={Profile} />
      <AppTabs.Screen name={SEARCH} component={Search} />
      <AppTabs.Screen name={CONTACTS} component={Contacts} />
    </AppTabs.Navigator>
  );
};

export default AppNavigator;
