import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ZoomIn} from 'react-native-reanimated';
import CircleButton from '../../components/Buttons/CircleButton';
import {CHAT} from '../../components/Navigation/ContactsNavigator';
import animationConstants from '../../utils/animationConstants';
import styles from './Contact.styles';

const ChatButton = ({
  userId,
  chatTitle,
  chatId,
}: {
  userId: number;
  chatTitle: string;
  chatId: string;
}) => {
  const navigation = useNavigation();

  return (
    <CircleButton
      onPress={() =>
        navigation.navigate(CHAT, {userId, title: chatTitle, chatId})
      }
      icon="chatbubbles-outline"
      size={60}
      style={styles.chatButton}
      entering={ZoomIn.duration(animationConstants.BUTTON_IN / 2).delay(
        animationConstants.BUTTON_IN * 1.2,
      )}
    />
  );
};

export default ChatButton;
