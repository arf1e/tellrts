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
import SearchParameters from '../../screens/SearchParameters';
import Header from '../Header';
import {t} from 'i18next';
import IncomingRequests from '../../screens/IncomingRequests';

const SearchStackNavigator = createNativeStackNavigator();

export const SEARCH = 'Search Index';
export const ANKET = 'Anket';
export const REQUEST_RESULT = 'Request Result';
export const SEARCH_PARAMETERS = 'Search Parameters';
export const INCOMING_REQUESTS = 'Incoming Requests';

const SearchNavigator = () => {
  const requestState = useSelector(
    (state: {requestState: requestStateState}) =>
      state.requestState.requestState,
  );
  return (
    <SearchStackNavigator.Navigator>
      {requestState === REQUEST_IDLE && (
        <SearchStackNavigator.Group>
          <SearchStackNavigator.Screen
            name={SEARCH}
            component={Search}
            options={{header: () => null, title: t('navigation.SEARCH')}}
          />
          <SearchStackNavigator.Screen
            name={SEARCH_PARAMETERS}
            component={SearchParameters}
            options={{
              header: props => <Header {...props} />,
              title: t('navigation.SEARCH_PARAMETERS'),
            }}
          />
          <SearchStackNavigator.Screen
            name={INCOMING_REQUESTS}
            component={IncomingRequests}
            options={{
              header: props => <Header {...props} />,
              title: t('navigation.INCOMING_REQUESTS'),
            }}
          />
        </SearchStackNavigator.Group>
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
