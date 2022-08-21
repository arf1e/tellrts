import {gql} from '@apollo/client';
import {ImpressionIcon} from '../../assets/impressions';

export const SEE_REQUEST_QUERY = gql`
  query SeeRequest($id: Int!) {
    seeRequest(id: $id) {
      id
      name
      impressions
      guesses {
        id
        question {
          id
          text
        }
        answer
        isCorrect
      }
      to {
        id
        photo
        name
      }
    }
  }
`;

export type SeeRequestResult = {
  seeRequest: {
    id: number;
    name: string;
    impressions: [ImpressionIcon];
    guesses: {
      id: number;
      question: {
        id: number;
        text: string;
      };
      answer: string;
      isCorrect: boolean;
    }[];
    to: {
      id: number;
      name: string;
      photo: string;
    };
  };
};
