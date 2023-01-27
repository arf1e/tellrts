import {gql} from '@apollo/client';

export type GET_TELEGRAM_CODE_QUERY_RESULT = {
  generateTelegramCode: {
    code?: string;
    error: string | null;
  };
};

export const GET_TELEGRAM_CODE_QUERY = gql`
  query GenerateTelegramCode {
    generateTelegramCode {
      code
      error
    }
  }
`;
