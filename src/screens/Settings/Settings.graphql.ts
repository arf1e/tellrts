import {gql} from '@apollo/client';

export type LogoutMutationResult = {
  logout: {
    ok: boolean;
    error?: string;
  };
};

export const LOGOUT_MUTATION = gql`
  mutation LogoutMutation($token: String!) {
    logout(token: $token) {
      ok
      error
    }
  }
`;

export const SETTINGS_ME_QUERY = gql`
  query Me {
    me {
      id
      cityTitle
      email
    }
  }
`;
