import {gql} from '@apollo/client';
import {ImpressionIcon} from '../../assets/impressions';

export type TIncomingRequest = {
  id: number;
  successRate: number;
  impressions: ImpressionIcon[];
  from: {
    id: number;
    photo: string;
    bio: string;
  };
  to: {
    id: number;
    sex: boolean;
  };
};

export type INCOMING_REQUESTS_RESPONSE = {
  seeIncomingRequests: TIncomingRequest[];
};

export type IGNORE_REQUEST_RESULT = {
  ignoreRequest: {
    ok: boolean;
    error?: string;
  };
};

export type IGNORE_REQUEST_VARIABLES = {
  requestId: number;
};

export const IGNORE_REQUEST_MUTATION = gql`
  mutation IgnoreRequest($requestId: Int!) {
    ignoreRequest(requestId: $requestId) {
      ok
      error
    }
  }
`;

export const INCOMING_REQUESTS_QUERY = gql`
  query SeeIncomingRequests($cursor: Int) {
    seeIncomingRequests(cursor: $cursor) {
      id
      successRate
      impressions
      from {
        id
        photo
        bio
      }
      to {
        id
        sex
      }
    }
  }
`;
