import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../../screens/Search';
import Anket from '../../screens/Anket';

const SearchStackNavigator = createNativeStackNavigator();

export const SEARCH = 'Search Index';
export const ANKET = 'Anket';

const SearchNavigator = () => {
  return (
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen
        name={SEARCH}
        component={Search}
        options={{header: () => null}}
      />
      <SearchStackNavigator.Screen
        name={ANKET}
        component={Anket}
        options={{header: () => null}}
      />
    </SearchStackNavigator.Navigator>
  );
};

export default SearchNavigator;
