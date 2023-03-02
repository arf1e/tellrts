import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../utils/colors';
import {BodyCopy} from '../Typography';
import styles from './RequestUserCard.styles';

const SuccessScore = ({score}: {score: number}) => {
  return (
    <View style={styles.requestInfoLine}>
      <Icon
        name="check"
        color={colors.primary}
        size={16}
        style={styles.requestGuessesIcon}
      />
      <BodyCopy style={styles.requestDetailsScore}>{`${score}%`}</BodyCopy>
    </View>
  );
};

export default SuccessScore;
