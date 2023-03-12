import {useQuery} from '@apollo/client';
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import ChatHeader from '../../components/ChatHeader';
import {CHAT} from '../../components/Navigation/ContactsNavigator';
import errorCatcher from '../../utils/toasts';
import {GET_MY_BASIC_INFO, TChatUser} from './Chat.graphql';
import styles from './Chat.styles';
import Stream from './Stream';

type ParamList = {
  [CHAT]: {
    userId: number;
    chatId: string;
  };
};

const Chat = () => {
  const route = useRoute<RouteProp<ParamList, typeof CHAT>>();
  const {userId, chatId} = route.params;
  const {data} = useQuery<{me: TChatUser}>(GET_MY_BASIC_INFO, {
    fetchPolicy: 'cache-first',
    onError: e => errorCatcher(e),
  });

  return (
    <View style={styles.chatContainerStream}>
      <ChatHeader userId={userId} />
      {data?.me && (
        <Stream user={data.me} token={data.me.streamToken} chatId={chatId} />
      )}
    </View>
  );
};

export default Chat;
