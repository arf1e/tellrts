import React from 'react';
import {View} from 'react-native';
import {IMessage} from 'react-native-gifted-chat';
import {BodyCopy} from '../../components/Typography';
import styles from './Chat.styles';

const GiftedMessage = (props: IMessage) => {
  return (
    <View style={{width: 300, height: 100}}>
      <BodyCopy style={{color: 'black'}}>{props.text}</BodyCopy>
      <BodyCopy>{props.text}</BodyCopy>
    </View>
  );
};

export default GiftedMessage;
