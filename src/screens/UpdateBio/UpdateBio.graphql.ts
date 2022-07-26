import {gql} from '@apollo/client';

export type GetBioQueryResult = {
  me: {
    bio: string;
  };
};

export type UpdateBioResult = {
  updateBio: {
    ok: boolean;
    error?: string;
  };
};

export const GET_BIO_QUERY = gql`
  query me {
    me {
      id
      bio
    }
  }
`;

export const UPDATE_BIO_MUTATION = gql`
  mutation UpdateBio($bio: String!) {
    updateBio(bio: $bio) {
      ok
      error
    }
  }
`;
