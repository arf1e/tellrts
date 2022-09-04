import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../../screens/Search';
import Anket from '../../screens/Anket';
import RequestResult from '../../screens/RequestResult';
import {useSelector} from 'react-redux';
import {
  requestStateState,
  REQUEST_FILLING,
  REQUEST_IDLE,
  REQUEST_REVIEWING,
} from '../../utils/slices/requestStateSlice';

const SearchStackNavigator = createNativeStackNavigator();

export const SEARCH = 'Search Index';
export const ANKET = 'Anket';
export const REQUEST_RESULT = 'Request Result';

const SearchNavigator = () => {
  const requestState = useSelector(
    (state: {requestState: requestStateState}) =>
      state.requestState.requestState,
  );
  return (
    <SearchStackNavigator.Navigator>
      {requestState === REQUEST_IDLE && (
        <SearchStackNavigator.Screen
          name={SEARCH}
          component={Search}
          options={{header: () => null}}
        />
      )}
      {requestState === REQUEST_FILLING && (
        <SearchStackNavigator.Screen
          name={ANKET}
          component={Anket}
          options={{header: () => null}}
        />
      )}
      {requestState === REQUEST_REVIEWING && (
        <SearchStackNavigator.Screen
          name={REQUEST_RESULT}
          component={RequestResult}
          options={{header: () => null}}
        />
      )}
    </SearchStackNavigator.Navigator>
  );
};

export default SearchNavigator;
