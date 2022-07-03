import {gql} from '@apollo/client';

export const PROFILE_QUERY = gql`
  query me {
    me {
      id
      name
      birthday
      sex
      bio
      photo
      cityTitle
      countryCode
    }
  }
`;

export const PHOTO_QUERY = gql`
  query me {
    me {
      id
      photo
    }
  }
`;

export const PRIMARY_INFO_QUERY = gql`
  query me {
    me {
      id
      name
      birthday
      cityTitle
      countryCode
    }
  }
`;
