import {gql} from '@apollo/client';

export const SEND_REQUEST_MUTATION = gql`
  mutation SendRequest(
    $userId: Int!
    $name: String!
    $guesses: [GuessInput]
    $impressions: [String]
  ) {
    makeRequest(
      userId: $userId
      name: $name
      guesses: $guesses
      impressions: $impressions
    ) {
      ok
      error
      requestId
      successRate
      isMatch
    }
  }
`;

export type SendRequestResponse = {
  ok: boolean;
  error?: string;
  successRate?: number;
  requestId?: number;
  isMatch?: boolean;
};
