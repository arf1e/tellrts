import React from 'react';
import {ImageBackground, Pressable} from 'react-native';
import {TIncomingRequest} from '../../screens/IncomingRequests/IncomingRequests.graphql';
import Reanimated, {
  interpolate,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import RequestInfo from './RequestInfo';
import styles from './RequestUserCard.styles';
import animationConstants from '../../utils/animationConstants';

type Props = {
  onPress: () => void;
  request: TIncomingRequest;
};

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const RequestUserCard = ({onPress, request}: Props) => {
  const pressedShared = useSharedValue(0);

  const onPressIn = () => {
    pressedShared.value = withTiming(1, {
      duration: animationConstants.BUTTON_IN,
    });
  };

  const onPressOut = () => {
    pressedShared.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };

  const pressableAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: interpolate(pressedShared.value, [0, 1], [1, 0.95])}],
  }));

  const pressableStyles = [styles.cardContainer, pressableAnimatedStyle];
  return (
    <AnimatedPressable
      layout={Layout}
      onPressIn={onPressIn}
      onPress={onPress}
      onPressOut={onPressOut}
      style={pressableStyles}>
      <ImageBackground
        source={{uri: request.from.photo}}
        defaultSource={require('../../assets/image-cap.png')}
        style={styles.userPhotoImageContainer}>
        <RequestInfo
          animatedValue={pressedShared}
          successRate={request.successRate}
          impressions={request.impressions}
        />
      </ImageBackground>
    </AnimatedPressable>
  );
};

export default RequestUserCard;
