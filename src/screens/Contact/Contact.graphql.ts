import {gql} from '@apollo/client';
import {User} from '../Search/Search.graphql';

export type GetContactResult = {
  seeContact: {
    matchId: number;
    user: User;
    otherRequest: Request;
    myRequest: Request;
  };
};

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
        successRate
        isNameCorrect
        name
      }
      myRequest {
        successRate
        id
        isNameCorrect
        impressions
        guesses {
          id
          question {
            text
          }
          answer
          isCorrect
          correct
        }
      }
    }
  }
`;
