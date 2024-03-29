import {useQuery} from '@apollo/client';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import ChatHeader from '../../components/ChatHeader';
import {CHAT} from '../../components/Navigation/ContactsNavigator';
import {exitChat, getInChat} from '../../utils/slices/inChatSlice';
import {GET_MY_ID_QUERY} from './Chat.graphql';
import styles from './Chat.styles';
import Gifted from './Gifted';

type ParamList = {
  [CHAT]: {
    userId: number;
  };
};

const Chat = () => {
  const route = useRoute<RouteProp<ParamList, typeof CHAT>>();
  const {userId} = route.params;
  const {data} = useQuery<{me: {id: number}}>(GET_MY_ID_QUERY);
  const myId = data?.me.id;
  const dispatch = useDispatch();

  useEffect(() => {
    // HIDING TABBAR
    dispatch(getInChat());

    // TABBAR HIDE CLEANUP
    return function cleanup() {
      dispatch(exitChat());
    };
  });
  return (
    <View style={styles.chatContainer}>
      <ChatHeader userId={userId} />
      {myId && <Gifted userId={userId} myId={myId} />}
    </View>
  );
};

export default Chat;
