import {gql} from '@apollo/client';

export type EditAnswerResponse = {
  ok: boolean;
  error?: string;
};

export const UPDATE_OR_CREATE_LINE_MUTATION = gql`
  mutation UpdateOrCreateLine($questionId: Int!, $answerText: String!) {
    updateOrCreateLine(questionId: $questionId, answerText: $answerText) {
      ok
      error
    }
  }
`;

export type GetCurrentLineQueryResult = {
  getLine: {
    answer: {
      text: string;
    };
  };
};

export const GET_CURRENT_LINE_ANSWER_QUERY = gql`
  query GetLine($questionId: Int!) {
    getLine(questionId: $questionId) {
      answer {
        text
      }
    }
  }
`;

export const DELETE_LINE_MUTATION = gql`
  mutation DeleteLine($questionId: Int!) {
    deleteLine(questionId: $questionId) {
      ok
      error
    }
  }
`;
