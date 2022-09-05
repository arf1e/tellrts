import {useQuery} from '@apollo/client';
import React, {useEffect, useRef} from 'react';
import {FlatList, Platform} from 'react-native';
import {SeeChatResult, SEE_CHAT_QUERY} from './Chat.graphql';
import styles from './Chat.styles';
import Message from './Message';
import ChatInput from './ChatInput';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DismissKeyboard from '../../components/DismissKeyboard';
import {subscribeToChatUpdates} from './Chat.utils';

type Props = {
  userId: number;
};

const MessageList = ({userId}: Props) => {
  const sRef = useRef<FlatList>(null);
  const {subscribeToMore, ...result} = useQuery<
    SeeChatResult,
    {userId: number}
  >(SEE_CHAT_QUERY, {variables: {userId}});

  useEffect(() => {
    const subscription = subscribeToChatUpdates(subscribeToMore, userId);

    return subscription();
  }, [subscribeToMore, userId]);
  return (
    <>
      <DismissKeyboard>
        <FlatList
          data={result.data?.seeChat}
          style={styles.messagesScrollable}
          ref={sRef}
          renderItem={({item: message}) => (
            <Message message={message} key={message.id} />
          )}
          contentContainerStyle={styles.messagesList}
          contentInset={{bottom: 20, top: 0, left: 0, right: 0}}
        />
      </DismissKeyboard>
      <ChatInput userId={userId} chatRef={sRef.current} />
      {Platform.OS === 'ios' && (
        <KeyboardSpacer
          onToggle={toggleState => {
            if (toggleState === true) {
              sRef.current && sRef.current.scrollToEnd({animated: true});
            }
          }}
        />
      )}
    </>
  );
};

export default MessageList;
