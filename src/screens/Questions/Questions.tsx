import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, Pressable, ScrollView, View} from 'react-native';
import Container from '../../components/Container';
import {BodyCopy, Subtitle} from '../../components/Typography';
import {
  EDIT_ANSWER,
  QUESTIONS,
} from '../../components/Navigation/ProfileNavigator';
import {useQuery} from '@apollo/client';
import styles from './Questions.styles';
import {
  GetQuestionsData,
  GetQuestionsInput,
  GET_QUESTIONS_QUERY,
  Question,
} from './Questions.graphql';
import CenterContainer from '../../components/Container/CenterContainer';
import colors from '../../utils/colors';

type QuestionsParamList = {
  [QUESTIONS]: {
    title: string;
    categoryId: number;
  };
};

type QuestionsRouteProp = RouteProp<QuestionsParamList, typeof QUESTIONS>;

const QuestionCard = ({
  question,
  onPress,
}: {
  question: Question;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.questionContainer}>
        <BodyCopy style={styles.questionText}>{question.text}</BodyCopy>
      </View>
    </Pressable>
  );
};

export default () => {
  const route = useRoute<QuestionsRouteProp>();
  const navigation = useNavigation();

  const {categoryId, title: categoryTitle} = route.params;

  const {error, loading, data} = useQuery<GetQuestionsData, GetQuestionsInput>(
    GET_QUESTIONS_QUERY,
    {
      variables: {
        categoryId,
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  if (error) {
    // TODO: Handle errors
    return (
      <CenterContainer>
        <BodyCopy>error</BodyCopy>
      </CenterContainer>
    );
  }

  if (loading) {
    return (
      <CenterContainer>
        <ActivityIndicator size="large" color={colors.primary} />
      </CenterContainer>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Container>
        <View style={styles.questionsGrid}>
          {data &&
            data.getCategoryQuestions.map(question => (
              <QuestionCard
                question={question}
                key={question.id}
                onPress={() =>
                  // @ts-ignore
                  navigation.navigate(EDIT_ANSWER, {
                    title: question.text,
                    questionId: question.id,
                    headerBackTitle: categoryTitle,
                  })
                }
              />
            ))}
        </View>
      </Container>
    </ScrollView>
  );
};
