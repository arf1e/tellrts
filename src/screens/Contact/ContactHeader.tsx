import {useQuery} from '@apollo/client';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Container from '../../components/Container';
import LoadingIndicator from '../../components/LoadingIndicator';
import {BodyCopy, Subtitle} from '../../components/Typography';
import {GetContactInfoResult, GET_CONTACT_INFO_QUERY} from './Contact.graphql';
import styles from './Contact.styles';
import {PinchablePhoto} from '../../components/PinchablePhoto';
import ChatButton from './Contact.ChatButton';
import ContactInfo from './ContactInfo';
import ContactGoBack from './Contact.GoBack';

type Props = {
  userId: number;
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

  if (data?.seeContact) {
    const {age, name} = data?.seeContact.user;
    const chatTitle = `${name}, ${age}`;

    return (
      <View>
        <View style={styles.photoContainer}>
          <PinchablePhoto
            style={styles.headerContainer}
            defaultSource={require('../../assets/image-cap.png')}
            source={{uri: data?.seeContact.user.photo}}>
            <ContactGoBack />
            <ContactInfo user={data?.seeContact.user} />
            <ChatButton
              userId={userId}
              chatTitle={chatTitle}
              chatId={data?.seeContact.chatId}
            />
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
  }

  return (
    <View style={styles.contactHeaderPlaceholder}>
      <ContactGoBack />
    </View>
  );
};

export default ContactHeader;
