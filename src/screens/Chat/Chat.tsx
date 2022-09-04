import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {CHAT} from '../../components/Navigation/ContactsNavigator';
import {exitChat, getInChat} from '../../utils/slices/inChatSlice';
import styles from './Chat.styles';
import MessageList from './MessageList';

type ParamList = {
  [CHAT]: {
    userId: number;
  };
};

const Chat = () => {
  const route = useRoute<RouteProp<ParamList, typeof CHAT>>();
  const {userId} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    // HIDING TABBAR
    dispatch(getInChat());

    return function cleanup() {
      dispatch(exitChat());
    };
  });
  return (
    <View style={styles.container}>
      <MessageList userId={userId} />
    </View>
  );
};

export default Chat;
