import React from 'react';
import {Modal, SafeAreaView, ModalProps, View, Pressable} from 'react-native';
import Reanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';
import DismissKeyboard from '../DismissKeyboard';
import {BodyCopy, Subtitle} from '../Typography';

import styles from './Modals.style';

interface Props extends ModalProps {
  active: boolean;
  closeModal: () => void;
  title: string;
}

type CloseBtnProps = {
  onPress: () => void;
};

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const CloseBtn = ({onPress}: CloseBtnProps) => {
  const pressedShared = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: interpolate(
            pressedShared.value,
            [0, 1],
            [1, animationConstants.SCALE_ON_PRESS],
          ),
        },
      ],
      opacity: interpolate(pressedShared.value, [0, 1], [1, 0.8]),
    }),
    [pressedShared],
  );

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

  const btnStyles = [styles.closeBtn, animatedStyle];

  return (
    <AnimatedPressable
      style={btnStyles}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}>
      <Icon name="close" size={40} color={colors.primary} />
    </AnimatedPressable>
  );
};

const FullScreenModal = ({active, closeModal, title, children}: Props) => {
  return (
    <Modal animationType="slide" visible={active} onRequestClose={closeModal}>
      <DismissKeyboard>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Subtitle>{title}</Subtitle>
              <CloseBtn onPress={closeModal} />
            </View>
            <View style={styles.content}>{children}</View>
          </View>
        </SafeAreaView>
      </DismissKeyboard>
    </Modal>
  );
};

export default FullScreenModal;
