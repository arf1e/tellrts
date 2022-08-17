import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Option from '../../components/Option/Option';
import colors from '../../utils/colors';
import styles from './Anket.styles';

const AnimatedText = Reanimated.createAnimatedComponent(Text);

type Props = {
  question: string;
  answer?: string;
  options: string[];
  handleChoose: (option: string) => void;
};

const Answer = ({answer = '...'}: {answer?: string}) => {
  const switchShared = useSharedValue(0);

  useEffect(() => {
    switchShared.value = withSequence(
      withTiming(1, {duration: 200}),
      withTiming(0),
    );
  }, [answer, switchShared]);

  const animatedTextStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(switchShared.value, [0, 1], [1, 0.5]),
      color: interpolateColor(
        switchShared.value,
        [0, 1],
        [colors.gray, colors.primary],
      ),
      transform: [
        {
          translateY: interpolate(switchShared.value, [0, 1], [0, -40]),
        },
      ],
    }),
    [switchShared],
  );

  const textStyles = [styles.profileLineQuestion, animatedTextStyle];

  return <AnimatedText style={textStyles}> {answer}</AnimatedText>;
};

const ProfileLine = ({question, answer, options, handleChoose}: Props) => {
  return (
    <View style={styles.profileLineContainer}>
      <View style={styles.profileLineHeadingContainer}>
        <AnimatedText style={styles.profileLineQuestion}>
          {question}
          <Answer answer={answer} />
        </AnimatedText>
      </View>
      <View style={styles.profileLineContentContainer}>
        {options.map((option, i) => (
          <Option
            title={option}
            isActive={option === answer}
            key={i}
            onPress={() => handleChoose(option)}
          />
        ))}
      </View>
    </View>
  );
};

export default ProfileLine;
