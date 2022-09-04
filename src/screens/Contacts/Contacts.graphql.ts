import {gql} from '@apollo/client';
import {User} from '../Search/Search.graphql';

export type GetContactsResult = {
  findContacts: User[];
};

export const GET_CONTACTS_QUERY = gql`
  query GetContacts {
    findContacts {
      id
      photo
      name
      cityTitle
      age
    }
  }
`;
