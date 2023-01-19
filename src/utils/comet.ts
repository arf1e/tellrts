import {CometChat} from '@cometchat-pro/react-native-chat';
import {CC_AUTH_KEY} from './init';

export const loginToCometChat = (userId: number | string) => {
  CometChat.login(userId, CC_AUTH_KEY).then(
    user => {
      console.log('CometChat User login successful: ', {user});
    },
    error => {
      console.log('CometChat User login failed: ', {error});
    },
  );
};
