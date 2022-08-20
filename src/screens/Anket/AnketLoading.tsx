import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Reanimated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import colors from '../../utils/colors';
import styles from './Anket.styles';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const AnketLoading = () => (
  <AnimatedView
    style={styles.stepContainer}
    entering={SlideInDown.duration(480).delay(120)}
    exiting={SlideOutDown.duration(480).delay(120)}>
    <View style={styles.anketLoadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  </AnimatedView>
);

export default AnketLoading;
