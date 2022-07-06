import {gql} from '@apollo/client';
import {Category} from '../Categories/Categories.graphql';

export type Question = {
  id: number;
  text: string;
  closed: boolean;
  category: Category;
};

export type GetQuestionsInput = {
  categoryId: number;
};

export type GetQuestionsData = {
  getCategoryQuestions: Question[];
};

export const GET_QUESTIONS_QUERY = gql`
  query GetQuestions($categoryId: Int!) {
    getCategoryQuestions(categoryId: $categoryId) {
      id
      text
      closed
    }
  }
`;
