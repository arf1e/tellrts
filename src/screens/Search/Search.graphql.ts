import {gql} from '@apollo/client';
import {Question} from '../Questions/Questions.graphql';

export type User = {
  id: number;
  email: string;
  name: string;
  bio: string;
  photo: string;
  birthday: string;
  countryCode: string;
  cityId: string;
  sex: boolean;
  cityTitle: string;
};

export type SearchQueryResult = {
  searchUsers: User[];
};

export type Answer = {
  id: number;
  text: string;
  question: Question;
  sex: boolean;
};

export type Anket = {
  id: number;
  sex: 'male' | 'female';
  names: string[];
  photo: string;
  bio: string;
  lines: {
    question: Question;
    answers: Answer[];
  }[];
};

export type GetAnketResult = {
  getAnket: Anket;
};

export const GET_ANKET_QUERY = gql`
  query GetAnket($id: Int!) {
    getAnket(id: $id) {
      id
      names
      lines {
        answers {
          id
          text
        }
        question {
          id
          text
          closed
          category {
            id
            title
          }
        }
      }
      photo
      bio
    }
  }
`;

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers {
    searchUsers {
      id
      photo
      bio
    }
  }
`;
