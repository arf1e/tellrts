import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import styles from './Contact.styles';

type Props = {
  title: string;
  children: ReactNode;
};

const ContactCard = ({title, children}: Props) => {
  return (
    <View style={styles.contactCardContainer}>
      <BodyCopy style={styles.contactCardTitle}>{title}</BodyCopy>
      <View style={styles.contactCardContent}>{children}</View>
    </View>
  );
};

export default ContactCard;
