import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Reanimated, {
  FadeInUp,
  Layout,
  SlideInUp,
  ZoomIn,
  ZoomInDown,
  ZoomInUp,
  ZoomOut,
  ZoomOutDown,
} from 'react-native-reanimated';
import styles from './Chat.styles';
import colors from '../../utils/colors';
import animationConstants from '../../utils/animationConstants';
import {BodyCopy} from '../../components/Typography';

const ReanimatedView = Reanimated.createAnimatedComponent(View);
const AnimatedText = Reanimated.createAnimatedComponent(Text);

const ChatLoader = () => {
  return (
    <View style={styles.chatLoaderContainer}>
      <ReanimatedView
        entering={ZoomIn.duration(animationConstants.BUTTON_IN).delay(140)}
        exiting={ZoomOut.duration(animationConstants.BUTTON_OUT)}
        layout={Layout}>
        <ActivityIndicator size="large" color={colors.primary} />
        <AnimatedText
          entering={FadeInUp.stiffness(10).delay(300)}
          style={styles.chatLoaderText}>
          Connecting to the chat...
        </AnimatedText>
      </ReanimatedView>
    </View>
  );
};

export default ChatLoader;
