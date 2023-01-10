import React, {ReactNode} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageProps,
  View,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Reanimated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AVATAR_HEIGHT} from '../../utils/photos';

const ReanimatedImage = Reanimated.createAnimatedComponent(ImageBackground);
const ReanimatedView = Reanimated.createAnimatedComponent(View);

const DEVICE_WIDTH = Dimensions.get('window').width;

interface Props extends ImageProps {
  height?: number;
  children?: ReactNode;
  width?: number;
  hideableShared?: SharedValue<number>;
  interfaceTiltShared?: SharedValue<number>;
}

const PinchablePhoto = ({
  height = AVATAR_HEIGHT,
  width = DEVICE_WIDTH,
  hideableShared,
  interfaceTiltShared,
  children,
  ...rest
}: Props) => {
  const MIDDLE_X = width / 2;
  const MIDDLE_Y = height / 2;
  const xPosition = useSharedValue(0);
  const yPosition = useSharedValue(0);
  const xTarget = useSharedValue(0);
  const yTarget = useSharedValue(0);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onBegin(e => {
      const deltaX = e.focalX - MIDDLE_X;
      const deltaY = e.focalY - MIDDLE_Y;
      xTarget.value = -deltaX;
      yTarget.value = -deltaY;
    })
    .onUpdate(e => {
      scale.value = e.scale < 1 ? 1 : e.scale > 3 ? 3 : e.scale;
      if (interfaceTiltShared) {
        interfaceTiltShared.value = scale.value;
      }
      // Hide settings button
      if (hideableShared) {
        hideableShared.value = withTiming(0, {duration: 240});
      }
    })
    .onEnd(() => {
      savedScale.value = withTiming(1, {duration: 100});
      if (hideableShared) {
        hideableShared.value = withTiming(1, {duration: 240});
      }
      if (interfaceTiltShared) {
        interfaceTiltShared.value = withTiming(1);
      }
      scale.value = withTiming(1);
      xPosition.value = withTiming(0);
      yPosition.value = withTiming(0);
    });

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
      {
        translateX: interpolate(
          scale.value,
          [1, 3],
          [0, xTarget.value],
          Extrapolate.CLAMP,
        ),
      },
      {
        translateY: interpolate(
          scale.value,
          [1, 3],
          [0, yTarget.value / 2],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const animatedViewStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scale.value,
      [1, 3],
      [height, height * 1.4],
      Extrapolate.CLAMP,
    ),
  }));
  return (
    <ReanimatedView style={[{height, width}, animatedViewStyle]}>
      <GestureDetector gesture={pinchGesture}>
        <ReanimatedImage
          source={rest.source}
          defaultSource={require('../../assets/image-cap.png')}
          style={[rest.style, animatedImageStyle]}
          resizeMode="cover">
          {children}
        </ReanimatedImage>
      </GestureDetector>
    </ReanimatedView>
  );
};

export default PinchablePhoto;
