import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import _ from 'lodash';
import {
  MutationResponse,
  SeeChatResult,
  SEE_CHAT_QUERY,
  SEND_MESSAGE_MUTATION,
  UPLOAD_MORE_MESSAGES_QUERY,
} from './Chat.graphql';
import {subscribeToChatUpdates} from './Chat.utils';
import {giftedMessageAdapter} from './messageAdapter';
import styles from './Chat.styles';
import GiftedMessage from './GiftedMessage';

type Props = {
  userId: number;
  myId: number;
};

const Gifted = ({userId, myId}: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [sendMessageToChat] = useMutation<
    MutationResponse,
    {userId: number; text: string}
  >(SEND_MESSAGE_MUTATION);

  const {subscribeToMore, ...result} = useQuery<
    SeeChatResult,
    {userId: number}
  >(SEE_CHAT_QUERY, {
    variables: {userId},

    onCompleted: data => {
      setMessages(
        _.uniqBy(
          [...messages, ...data.seeChat.map(giftedMessageAdapter)],
          '_id',
        ),
      );
    },
  });

  const [uploadMore, {called: moreCalled, loading: moreLoading}] =
    useLazyQuery<SeeChatResult>(UPLOAD_MORE_MESSAGES_QUERY, {
      onCompleted: data =>
        setMessages([...data.seeChat.map(giftedMessageAdapter), ...messages]),
    });

  useEffect(() => {
    const subscription = subscribeToChatUpdates(subscribeToMore, userId);

    return subscription();
  }, [subscribeToMore, userId]);

  return (
    <View style={styles.giftedContainer}>
      <GiftedChat
        messages={messages}
        isLoadingEarlier={moreLoading}
        loadEarlier={true}
        scrollToBottom
        onLoadEarlier={() =>
          uploadMore({variables: {userId, cursor: messages[0]._id}})
        }
        inverted={false}
        renderAvatar={() => null}
        alignTop={true}
        onSend={msgs => {
          sendMessageToChat({variables: {userId, text: msgs[0].text}});
        }}
        user={{
          _id: myId,
        }}
      />
    </View>
  );
};

export default Gifted;
