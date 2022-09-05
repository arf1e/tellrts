import React from 'react';
import {View} from 'react-native';
import styles from './Chat.styles';
import {TMessage} from './Chat.graphql';
import {BodyCopy} from '../../components/Typography';
import moment from 'moment';

const Message = ({message}: {message: TMessage}) => {
  const containerStyles = [
    styles.messageContainer,
    message.isMine ? styles.myMessage : styles.otherMessage,
  ];
  return (
    <View style={containerStyles}>
      <BodyCopy style={styles.messageText}>{message.text}</BodyCopy>
      <BodyCopy style={styles.messageCreatedAt}>
        {moment(Number(message.createdAt)).format('LLL')}
      </BodyCopy>
    </View>
  );
};

export default Message;
