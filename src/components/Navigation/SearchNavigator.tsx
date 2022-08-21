import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../../screens/Search';
import Anket from '../../screens/Anket';
import {useSelector} from 'react-redux';
import {AnketState} from '../../utils/slices/anketSlice';
import RequestResult from '../../screens/RequestResult';
import Header from '../Header';

const SearchStackNavigator = createNativeStackNavigator();

export const SEARCH = 'Search Index';
export const ANKET = 'Anket';
export const REQUEST_RESULT = 'Request Result';

const SearchNavigator = () => {
  const anket = useSelector((state: {anket: AnketState}) => state.anket.anket);
  const activeAnket = Boolean(anket?.id);
  return (
    <SearchStackNavigator.Navigator>
      {activeAnket ? (
        <SearchStackNavigator.Screen
          name={ANKET}
          component={Anket}
          options={{header: () => null}}
        />
      ) : (
        <SearchStackNavigator.Screen
          name={SEARCH}
          component={Search}
          options={{header: () => null}}
        />
      )}
      <SearchStackNavigator.Screen
        name={REQUEST_RESULT}
        component={RequestResult}
        options={{header: props => <Header {...props} />}}
      />
    </SearchStackNavigator.Navigator>
  );
};

export default SearchNavigator;
