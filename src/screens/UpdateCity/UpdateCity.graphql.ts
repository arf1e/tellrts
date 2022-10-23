import {gql} from '@apollo/client';

export const GET_MY_LOCATION_QUERY = gql`
  query MyLocation {
    me {
      id
      cityId
      cityTitle
      countryCode
    }
  }
`;

export type UPDATE_CITY_MUTATION_DATA = {
  ok: boolean;
  error?: string;
};

export type UPDATE_CITY_MUTATION_VARIABLES = {
  cityId: string;
  countryCode?: string;
};

export const UPDATE_CITY_MUTATION = gql`
  mutation updateCity($countryCode: String, $cityId: String!) {
    updateCity(countryCode: $countryCode, cityId: $cityId) {
      ok
      error
    }
  }
`;

export type MyLocationQueryResult = {
  me: {
    id: number;
    cityId: string;
    cityTitle: string;
    countryCode: string;
  };
};
