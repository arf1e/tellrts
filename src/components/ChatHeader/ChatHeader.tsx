import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, View} from 'react-native';
import Container from '../Container';
import {Subtitle} from '../Typography';
import Icon from 'react-native-vector-icons/Feather';
import {
  GET_NAME_AND_PHOTO_QUERY,
  GET_NAME_AND_PHOTO_QUERY_RESPONSE,
} from './ChatHeader.graphql';
import styles from './ChatHeader.styles';
import colors from '../../utils/colors';

type Props = {
  userId: number;
};

const ChatHeader = ({userId}: Props) => {
  const navigation = useNavigation();
  const {data, error, loading} = useQuery<GET_NAME_AND_PHOTO_QUERY_RESPONSE>(
    GET_NAME_AND_PHOTO_QUERY,
    {
      variables: {userId},
    },
  );

  return (
    <View style={styles.chatHeaderContainer}>
      <Container>
        <View style={styles.chatHeaderContent}>
          <Pressable
            style={styles.chatHeaderUserInfo}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color={colors.primary} size={32} />
            <Image
              source={{uri: data?.seeContact.user.photo}}
              style={styles.chatHeaderUserPhoto}
              testID="ChatHeader.UserImage"
            />
            <Subtitle style={styles.chatHeaderUserName}>
              {data?.seeContact.user.name}
            </Subtitle>
          </Pressable>
          <Pressable>
            <Icon name="more-vertical" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </Container>
    </View>
  );
};

export default ChatHeader;
