import {gql} from '@apollo/client';
import {User} from '../Search/Search.graphql';

export type TMessage = {
  id: number;
  user: User;
  text: string;
  read: boolean;
  isMine: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SeeChatResult = {
  seeChat: TMessage[];
  chatUpdates: TMessage[];
};

export const CHAT_SUBSCRIPTION = gql`
  subscription OnChatUpdate($userId: Int!) {
    chatUpdates(userId: $userId) {
      id
      isMine
      createdAt
      text
      user {
        id
      }
      chatId
    }
  }
`;

export const GET_MY_ID_QUERY = gql`
  query me {
    me {
      id
    }
  }
`;

export const SEE_CHAT_QUERY = gql`
  query SeeChat($userId: Int!) {
    seeChat(userId: $userId) {
      id
      isMine
      createdAt
      user {
        id
      }
      text
      chatId
    }
  }
`;

export const UPLOAD_MORE_MESSAGES_QUERY = gql`
  query SeeChat($userId: Int!, $cursor: Int) {
    seeChat(userId: $userId, cursor: $cursor) {
      id
      isMine
      createdAt
      user {
        id
      }
      text
      chatId
    }
  }
`;

export type MutationResponse = {
  ok: boolean;
  error?: string;
};

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($text: String!, $userId: Int!) {
    sendMessage(text: $text, userId: $userId) {
      ok
      error
    }
  }
`;
