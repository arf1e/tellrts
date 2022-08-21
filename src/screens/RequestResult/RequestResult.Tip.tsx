import React from 'react';
import {View} from 'react-native';
import PrimaryButton from '../../components/Buttons';
import Container from '../../components/Container';
import {BodyCopy} from '../../components/Typography';
import styles from './RequestResult.styles';

type Props = {
  text: string;
  buttonTitle: string;
  onPress: () => void;
};

const ReviewTip = ({text, onPress, buttonTitle}: Props) => {
  return (
    <Container>
      <View style={styles.resultTipContainer}>
        <BodyCopy style={styles.resultTipText}>{text}</BodyCopy>
        <PrimaryButton title={buttonTitle} onPress={onPress} />
      </View>
    </Container>
  );
};

export default ReviewTip;
