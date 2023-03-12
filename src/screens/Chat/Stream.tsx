import React, {useEffect} from 'react';
import {useChatClient} from '../../hooks/useChatClient';
import {TChatUser} from './Chat.graphql';
import styles from './Chat.styles';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import {useDispatch} from 'react-redux';
import {STREAM_CHAT_API_KEY} from '../../../apis';
import {View} from 'react-native';
import {exitChat, getInChat} from '../../utils/slices/inChatSlice';
import ChatLoader from './ChatLoader';
import {streami18n} from '../../utils/i18n';

const Stream = ({
  user,
  token,
  chatId,
}: {
  user: TChatUser;
  token: string;
  chatId: string;
}) => {
  const {clientIsReady} = useChatClient(user, token);
  const chatClient = StreamChat.getInstance(STREAM_CHAT_API_KEY);
  const streamChannel = chatClient.getChannelById('messaging', chatId, {});
  const dispatch = useDispatch();

  useEffect(() => {
    // HIDING TABBAR
    dispatch(getInChat());

    // TABBAR HIDE CLEANUP
    return function cleanup() {
      dispatch(exitChat());
    };
  });

  if (!clientIsReady) {
    return <ChatLoader />;
  }

  return (
    <View style={styles.chatContainerStream}>
      <Chat client={chatClient} i18nInstance={streami18n}>
        <Channel
          channel={streamChannel}
          CommandsButton={() => null}
          LoadingIndicator={() => <ChatLoader />}
          EmptyStateIndicator={() => null}
          MessageAvatar={() => null}>
          <MessageList HeaderComponent={() => null} />
          <MessageInput InputGiphySearch={() => null} />
        </Channel>
      </Chat>
    </View>
  );
};

export default Stream;
