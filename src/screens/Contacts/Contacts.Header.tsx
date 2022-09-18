import React from 'react';
import {useTranslation} from 'react-i18next';
import Reanimated, {Layout} from 'react-native-reanimated';
import Container from '../../components/Container';
import HeaderStyles from '../../components/Header/Header.styles';
import styles from './Contacts.styles';
import {Subtitle} from '../../components/Typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import ContactsInput from './Contacts.Input';
import NewContacts from './Contacts.New';
import {useSelector} from 'react-redux';
import {ContactsInputState} from '../../utils/slices/contactsInputSlice';

const AnimatedView = Reanimated.createAnimatedComponent(SafeAreaView);

const ContactsHeader = () => {
  const {t} = useTranslation();
  const {isFocused: isContactsSearchFocused, inputValue: contactsSearchValue} =
    useSelector(
      (state: {contactsInput: ContactsInputState}) => state.contactsInput,
    );

  const shouldRenderNewContacts =
    !isContactsSearchFocused && contactsSearchValue.length === 0;
  return (
    <AnimatedView layout={Layout} style={styles.screenHeader}>
      <Container>
        <Subtitle style={HeaderStyles.screenTitle}>
          {t('navigation.CONTACTS')}
        </Subtitle>
      </Container>
      <ContactsInput />
      {shouldRenderNewContacts && <NewContacts />}
    </AnimatedView>
  );
};

export default ContactsHeader;
