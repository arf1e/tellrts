import {View} from 'react-native';
import React from 'react';
import SearchHeader from './SearchHeader';
import styles from './Search.styles';
import SearchUsers from './SearchUsers';

export const SEARCH_PAGE = 'SEARCH_PAGE';
export const REQUESTS_PAGE = 'REQUESTS_PAGE';

export type PAGES = typeof SEARCH_PAGE | typeof REQUESTS_PAGE;

const Search = () => {
  return (
    <View style={styles.container}>
      <SearchHeader />
      <SearchUsers />
    </View>
  );
};

export default Search;
