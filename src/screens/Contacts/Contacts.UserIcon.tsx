import React from 'react';
import Reanimated, {
  interpolate,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Image, Pressable, View} from 'react-native';
import Container from '../../components/Container';
import {BodyCopy} from '../../components/Typography';
import {User} from '../Search/Search.graphql';
import styles from './Contacts.styles';
import animationConstants from '../../utils/animationConstants';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);
const AnimatedImage = Reanimated.createAnimatedComponent(Image);
const AnimatedView = Reanimated.createAnimatedComponent(View);

const UserIcon = ({user, onPress}: {user: User; onPress: () => void}) => {
  const isPressedShared = useSharedValue(0);

  const onPressIn = () => {
    isPressedShared.value = withTiming(1, {
      duration: animationConstants.BUTTON_IN,
    });
  };

  const onPressOut = () => {
    isPressedShared.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };

  const photoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: interpolate(isPressedShared.value, [0, 1], [1, 1.05])}],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: interpolate(isPressedShared.value, [0, 1], [0, 4])},
    ],
  }));

  const photoStyles = [photoAnimatedStyle, styles.userLinePhoto];
  const infoStyles = [textAnimatedStyle, styles.userLineInfo];
  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={styles.userLineContainer}>
      <Container>
        <AnimatedView style={styles.userLineContent}>
          <AnimatedImage source={{uri: user.photo}} style={photoStyles} />
          <AnimatedView layout={Layout} style={infoStyles}>
            <BodyCopy style={styles.userLineName}>{user.name}</BodyCopy>
            <BodyCopy style={styles.userLineCity}>{user.cityTitle}</BodyCopy>
          </AnimatedView>
        </AnimatedView>
      </Container>
    </AnimatedPressable>
  );
};

export default UserIcon;
