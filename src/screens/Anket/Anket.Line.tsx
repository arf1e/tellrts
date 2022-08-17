import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Option from '../../components/Option/Option';
import {Question} from '../Questions/Questions.graphql';
import {Answer} from '../Search/Search.graphql';
import styles from './Anket.styles';

type AnketLine = {
  question: Question;
  answers: Answer[];
  chosenAnswer?: string;
  chooseAnswer: (answer: Answer) => void;
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
        <Text style={styles.anketLineQuestion}>{question.text}</Text>
      </View>
      <ScrollView horizontal={true}>
        {answers.map(answer => (
          <Option
            key={answer.id}
            isActive={chosenAnswer === answer.text}
            title={answer.text}
            pressable={{style: {maxHeight: 174}}}
            onPress={() => chooseAnswer(answer)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AnketLine;
