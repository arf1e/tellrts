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
      bio
      cityTitle
      countryCode
    }
  }
`;

export type PrimaryInfoData = {
  me: {
    name: string;
    bio: string;
    birthday: string;
    cityTitle: string;
  };
};

export const GET_MOST_POPULAR_IMPRESSION_QUERY = gql`
  query SImpression {
    getMostPopularImpression {
      impression
      sex
    }
  }
`;

export const GET_LAST_MONTH_INTERACTIONS_COUNT_QUERY = gql`
  query SCount {
    getLastMonthInteractionsCount
  }
`;

export const GET_AVERAGE_SUCCESS_RATE_QUERY = gql`
  query SSuccessRate {
    getAverageSuccessRate
  }
`;

export const SHOULD_GET_STATISTICS_QUERY = gql`
  query ShouldGetStatistics {
    shouldGetStatistics
  }
`;
