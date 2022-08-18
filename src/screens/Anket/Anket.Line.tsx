import React, {useEffect} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';

import {Question} from '../Questions/Questions.graphql';
import {Answer} from '../Search/Search.graphql';
import styles from './Anket.styles';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);
const ReanimatedText = Reanimated.createAnimatedComponent(Text);

type AnketLine = {
  question: Question;
  answers: Answer[];
  chosenAnswer?: string;
  chooseAnswer: (answer: Answer) => void;
};

type OptionProps = {
  isActive?: boolean;
  text: string;
  onPress: () => void;
};

export const AnswerOption = ({isActive, text, onPress}: OptionProps) => {
  const activeShared = useSharedValue(0);
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

  useEffect(() => {
    if (isActive) {
      activeShared.value = withTiming(1, {
        duration: animationConstants.BUTTON_IN,
      });
      return;
    }

    if (!isActive) {
      activeShared.value = withTiming(0, {
        duration: animationConstants.BUTTON_OUT,
      });
      return;
    }
  }, [isActive, activeShared]);

  const pressableAnimatedStyle = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        activeShared.value,
        [0, 1],
        [colors.secondary, colors.primary],
      ),
      transform: [
        {
          scale: interpolate(pressedShared.value, [0, 1], [1, 0.98]),
        },
      ],
    }),
    [activeShared, pressedShared],
  );

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      activeShared.value,
      [0, 1],
      [colors.gray, colors.darkGray],
    ),
  }));

  const pressableStyles = [
    styles.answerOptionContainer,
    pressableAnimatedStyle,
  ];

  const textStyles = [styles.answerOptiontext, textAnimatedStyle];

  return (
    <ReanimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={pressableStyles}>
      <ReanimatedText style={textStyles}>{text}</ReanimatedText>
    </ReanimatedPressable>
  );
};

const AnketLine = ({
  question,
  answers,
  chooseAnswer,
  chosenAnswer,
}: AnketLine) => {
  return (
    <View style={styles.anketLineContainer}>
      <View style={styles.anketLineHeading}>
        <Text style={styles.lineQuestion}>{question.text}</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {answers.map((answer, i) => (
          <AnswerOption
            key={i}
            text={answer.text}
            onPress={() => chooseAnswer(answer)}
            isActive={chosenAnswer === answer.text}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AnketLine;
