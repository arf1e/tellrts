import {gql} from '@apollo/client';

export type GET_NAME_AND_PHOTO_QUERY_RESPONSE = {
  seeContact: {
    id: number;
    user: {
      id: number;
      name: string;
      photo: string;
    };
  };
};

export const GET_NAME_AND_PHOTO_QUERY = gql`
  query GetContact($userId: Int!) {
    seeContact(userId: $userId) {
      id
      user {
        id
        name
        photo
      }
    }
  }
`;
