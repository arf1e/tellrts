import React, {ReactNode} from 'react';
import {ActivityIndicator, Platform, View} from 'react-native';
import {BodyCopy} from '../Typography';
import styles from './Statistics.styles';

import Reanimated, {FadeIn, Layout} from 'react-native-reanimated';
import colors from '../../utils/colors';

const AnimatedView = Reanimated.createAnimatedComponent(View);

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  loading?: boolean;
};

const StatisticsCard = ({loading, children, title, description}: Props) => {
  return (
    <AnimatedView
      style={styles.cardContainer}
      layout={Platform.OS === 'android' ? undefined : Layout}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <AnimatedView entering={FadeIn}>
          {children}
          <View style={styles.cardInfo}>
            <BodyCopy style={styles.cardTitle}>{title}</BodyCopy>
            <BodyCopy style={styles.cardDescription}>{description}</BodyCopy>
          </View>
        </AnimatedView>
      )}
    </AnimatedView>
  );
};

export default StatisticsCard;
