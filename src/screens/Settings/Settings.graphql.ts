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
