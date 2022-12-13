import {IMessage} from 'react-native-gifted-chat';
import {TMessage} from './Chat.graphql';

export const giftedMessageAdapter = (message: TMessage): IMessage => ({
  _id: message.id,
  createdAt: parseInt(message.createdAt),
  text: message.text,
  user: {
    _id: message.user.id,
    ...message.user,
  },
});
