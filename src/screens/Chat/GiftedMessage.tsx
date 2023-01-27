import React from 'react';
import {View} from 'react-native';
import {Bubble, BubbleProps, IMessage} from 'react-native-gifted-chat';
import Reanimated, {FadeInDown, Layout} from 'react-native-reanimated';
import colors from '../../utils/colors';

const AnimatedBubble = Reanimated.createAnimatedComponent(View);

const GiftedMessage = (
  props: Readonly<BubbleProps<IMessage>> &
    Readonly<{
      children?: React.ReactNode;
    }>,
) => {
  return (
    <AnimatedBubble entering={FadeInDown.duration(140)} layout={Layout}>
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: colors.darkGray,
            padding: 4,
            borderRadius: 8,
            borderBottomLeftRadius: 0,
          },
          right: {
            backgroundColor: colors.primary,
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderRadius: 8,
            borderBottomRightRadius: 0,
          },
        }}
        textStyle={{
          left: {
            color: colors.background,
          },
        }}
      />
    </AnimatedBubble>
  );
};

export default GiftedMessage;
