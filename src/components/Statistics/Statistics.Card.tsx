import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {BodyCopy} from '../Typography';
import styles from './Statistics.styles';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const StatisticsCard = ({children, title, description}: Props) => {
  return (
    <View style={styles.cardContainer}>
      {children}
      <View style={styles.cardInfo}>
        <BodyCopy style={styles.cardTitle}>{title}</BodyCopy>
        <BodyCopy style={styles.cardDescription}>{description}</BodyCopy>
      </View>
    </View>
  );
};

export default StatisticsCard;
