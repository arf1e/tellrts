import React from 'react';
import styles from './Contact.styles';
import Reanimated, {FadeInDown} from 'react-native-reanimated';
import {View} from 'react-native';
import {User} from '../Search/Search.graphql';
import animationConstants from '../../utils/animationConstants';
import {BodyCopy} from '../../components/Typography';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

const ContactInfo = ({user}: {user: User}) => {
  return (
    <ReanimatedView
      entering={FadeInDown.duration(animationConstants.BUTTON_IN).delay(
        animationConstants.BUTTON_IN * 1.5,
      )}
      style={styles.contactHeaderInfo}>
      <BodyCopy
        style={
          styles.contactHeaderName
        }>{`${user.name}, ${user.age}`}</BodyCopy>
      <BodyCopy style={styles.contactHeaderCity}>{user.cityTitle}</BodyCopy>
    </ReanimatedView>
  );
};

export default ContactInfo;
