import {gql} from '@apollo/client';
import {ImpressionIcon} from '../../assets/impressions';
import {GuessWithAnswer} from '../Anket/Anket.types';
import {User} from '../Search/Search.graphql';

export type GetContactResult = {
  seeContact: {
    id: number;
    user: User;
    otherRequest: Request;
    myRequest: Request;
  };
};

export type GetContactInfoResult = {
  seeContact: {
    id: number;
    user: User;
  };
};

export const GET_CONTACT_INFO_QUERY = gql`
  query GetContact($userId: Int!) {
    seeContact(userId: $userId) {
      id
      user {
        id
        cityTitle
        name
        sex
        bio
        age
        photo
      }
    }
  }
`;

export type SeeReuestResult = {
  seeRequest: Request;
};

export type GetRequestsIdsResult = {
  seeContact: {
    id: number;
    myRequest: {
      id: number;
    };
    otherRequest: {
      id: number;
    };
  };
};

export const GET_REQUESTS_IDS = gql`
  query GetContact($userId: Int!) {
    seeContact(userId: $userId) {
      id
      myRequest {
        id
      }
      otherRequest {
        id
      }
    }
  }
`;

export type SeeRequestResult = {
  seeRequest: {
    id: number;
    name: string;
    isNameCorrect: boolean;
    to: User;
    successRate: number;
    impressions: ImpressionIcon[];
    guesses: GuessWithAnswer[];
  };
};

export const SEE_REQUEST_QUERY = gql`
  query SeeRequest($requestId: Int!) {
    seeRequest(id: $requestId) {
      id
      name
      isNameCorrect
      impressions
      to {
        id
        sex
      }
      successRate
      guesses {
        id
        question {
          id
          text
        }
        answer
        isCorrect
        correct
      }
    }
  }
`;

export const GET_CONTACT_QUERY = gql`
  query GetContact($userId: Int!) {
    seeContact(userId: $userId) {
      matchId
      user {
        id
        cityTitle
        name
        sex
        age
        photo
      }
      otherRequest {
        id
        successRate
      }
      myRequest {
        id
        successRate
      }
    }
  }
`;
