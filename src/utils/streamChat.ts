import {StreamChat} from 'stream-chat';
import {STREAM_CHAT_API_KEY} from '../../apis';

export const getStreamChatInstance = () =>
  StreamChat.getInstance(STREAM_CHAT_API_KEY);
