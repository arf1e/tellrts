import {gql} from '@apollo/client';

export type UpdatePasswordResponse = {
  updatePassword: {
    ok: boolean;
    error?: string;
  };
};

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      ok
      error
    }
  }
`;
