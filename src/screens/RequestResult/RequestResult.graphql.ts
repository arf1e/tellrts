import {gql} from '@apollo/client';
import {ImpressionIcon} from '../../assets/impressions';

export const SEE_REQUEST_QUERY = gql`
  query SeeRequest($id: Int!) {
    seeRequest(id: $id) {
      id
      name
      impressions
      isNameCorrect
      successRate
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
        sex
      }
    }
  }
`;

export type Request = {
  id: number;
  name: string;
  impressions: [ImpressionIcon];
  isNameCorrect: boolean;
  successRate: number;
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
    sex: boolean;
  };
};

export type SeeRequestResult = {
  seeRequest: Request;
};
