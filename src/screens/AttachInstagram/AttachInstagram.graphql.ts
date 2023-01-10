import {gql} from '@apollo/client';

export type GET_MY_INSTAGRAM_RESPONSE_TYPE = {
  getMyInstagramProfileByCode: {
    ok: boolean;
    error?: string;
    id?: string;
    username?: string;
  };
};

export const GET_MY_INSTAGRAM_PROFILE_BY_CODE_QUERY = gql`
  query GetMyInstagramProfileByCode($code: String!) {
    getMyInstagramProfileByCode(code: $code) {
      ok
      error
      id
      username
    }
  }
`;

export type CONNECT_MY_INSTAGRAM_PROFILE_RESPONSE = {
  connectMyInstagramProfile: {
    ok: boolean;
    error?: string;
  };
};

export const CONNECT_MY_INSTAGRAM_PROFILE_MUTATION = gql`
  mutation ConnectMyInstagramProfile($id: String!) {
    connectMyInstagramProfile(id: $id) {
      ok
      error
    }
  }
`;
