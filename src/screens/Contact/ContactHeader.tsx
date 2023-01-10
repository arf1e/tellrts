import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Image, ImageBackground, Pressable} from 'react-native';
import CircleButton from '../../components/Buttons/CircleButton';
import Container from '../../components/Container';
import LoadingIndicator from '../../components/LoadingIndicator';
import {CHAT} from '../../components/Navigation/ContactsNavigator';
import {BodyCopy, Subtitle} from '../../components/Typography';
import colors from '../../utils/colors';
import {User} from '../Search/Search.graphql';
import {GetContactInfoResult, GET_CONTACT_INFO_QUERY} from './Contact.graphql';
import styles from './Contact.styles';
import Reanimated, {
  FadeInDown,
  FadeInLeft,
  SlideInDown,
} from 'react-native-reanimated';
import {PinchablePhoto} from '../../components/PinchablePhoto';

type Props = {
  userId: number;
};

const ReanimatedView = Reanimated.createAnimatedComponent(View);

const ContactGoBack = () => {
  const navigation = useNavigation();

  return (
    <CircleButton
      onPress={() => navigation.goBack()}
      icon="chevron-back"
      size={44}
      iconColor={colors.primary}
      style={styles.contactGoBack}
    />
  );
};

const ChatButton = ({
  userId,
  chatTitle,
}: {
  userId: number;
  chatTitle: string;
}) => {
  const navigation = useNavigation();

  return (
    <CircleButton
      onPress={() => navigation.navigate(CHAT, {userId, title: chatTitle})}
      icon="chatbubbles-outline"
      size={60}
      style={styles.chatButton}
    />
  );
};

const ContactInfo = ({user}: {user: User}) => {
  return (
    <ReanimatedView
      entering={FadeInLeft.duration(320).delay(200)}
      style={styles.contactHeaderInfo}>
      <BodyCopy
        style={
          styles.contactHeaderName
        }>{`${user.name}, ${user.age}`}</BodyCopy>
      <BodyCopy style={styles.contactHeaderCity}>{user.cityTitle}</BodyCopy>
    </ReanimatedView>
  );
};

const ContactHeader = ({userId}: Props) => {
  const {error, loading, data} = useQuery<
    GetContactInfoResult,
    {userId: number}
  >(GET_CONTACT_INFO_QUERY, {variables: {userId}});
  const {t} = useTranslation();
  if (loading) {
    return <LoadingIndicator />;
  }

  const {age, name} = data?.seeContact.user;
  const chatTitle = `${name}, ${age}`;

  return (
    <View>
      <View style={styles.photoContainer}>
        <PinchablePhoto
          style={styles.headerContainer}
          defaultSource={require('../../assets/image-cap.png')}
          source={{uri: data.seeContact.user.photo}}>
          <ContactGoBack />
          <ContactInfo user={data?.seeContact.user} />
          <ChatButton userId={userId} chatTitle={chatTitle} />
        </PinchablePhoto>
      </View>
      <View style={styles.infoContainer}>
        <Container>
          <Subtitle style={styles.profileSectionTitle}>
            {t('app.contact.descriptionTitle')}
          </Subtitle>
          <BodyCopy style={styles.profileDescription}>
            {data?.seeContact.user.bio}
          </BodyCopy>
        </Container>
      </View>
    </View>
  );
};

export default ContactHeader;
