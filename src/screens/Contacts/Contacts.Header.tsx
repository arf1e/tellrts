import React from 'react';
import {useTranslation} from 'react-i18next';
import Reanimated, {Layout} from 'react-native-reanimated';
import Container from '../../components/Container';
import HeaderStyles from '../../components/Header/Header.styles';
import styles from './Contacts.styles';
import {Subtitle} from '../../components/Typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import ContactsInput from './Contacts.Input';

const AnimatedView = Reanimated.createAnimatedComponent(SafeAreaView);

const ContactsHeader = () => {
  const {t} = useTranslation();
  return (
    <AnimatedView layout={Layout} style={styles.screenHeader}>
      <Container>
        <Subtitle style={HeaderStyles.screenTitle}>
          {t('navigation.CONTACTS')}
        </Subtitle>
      </Container>
      <ContactsInput />
    </AnimatedView>
  );
};

export default ContactsHeader;
