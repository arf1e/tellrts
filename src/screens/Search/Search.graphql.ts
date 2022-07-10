import {gql} from '@apollo/client';

export type User = {
  id: number;
  email: string;
  name: string;
  bio: string;
  photo: string;
  birthday: string;
  countryCode: string;
  cityId: string;
  sex: boolean;
  cityTitle: string;
};

export type SearchQueryResult = {
  searchUsers: User[];
};

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers {
    searchUsers {
      id
      photo
      bio
    }
  }
`;
