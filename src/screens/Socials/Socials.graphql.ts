import {gql} from '@apollo/client';

export const GET_INSTAGRAM_LINK_QUERY = gql`
  query GetInstagramLink {
    getInstagramLink
  }
`;

export type CHECK_IF_I_HAVE_INSTAGRAM_QUERY_RESULT = {
  me: {
    id: number;
    instagram: string;
  };
};

export const CHECK_IF_I_HAVE_INSTAGRAM_QUERY = gql`
  query GetMyInstagram {
    me {
      id
      instagram
    }
  }
`;
