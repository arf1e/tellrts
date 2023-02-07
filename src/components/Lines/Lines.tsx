import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import ActionHeader from '../ActionHeader';
import styles from './Lines.styles';
import {useQuery} from '@apollo/client';

import GET_LINES_QUERY from './Lines.graphql';
import {BodyCopy} from '../Typography';
import colors from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {CATEGORIES, EDIT_ANSWER, PROFILE} from '../Navigation/ProfileNavigator';
import {useTranslation} from 'react-i18next';
import Link from '../Links';
import AddLine from './AddLine';

type Line = {
  id: number;
  question: {
    id: number;
    text: string;
    category: {
      id: number;
      title: string;
      image: string;
    };
  };
  answer: {
    id: number;
    text: string;
  };
};

type LinesData = {
  me: {
    id: number;
    lines: Line[];
  };
};

const LineCard = ({line, onPress}: {line: Line; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.lineContainer}>
        <View style={styles.lineQuestionBadge}>
          <BodyCopy style={styles.lineCategoryText}>
            {line.question.category.title}
          </BodyCopy>
        </View>
        <BodyCopy style={styles.lineQuestionText}>
          {line.question.text}
        </BodyCopy>
        <BodyCopy style={styles.lineAnswerText}>{line.answer.text}</BodyCopy>
      </View>
    </Pressable>
  );
};

export default () => {
  const navigation = useNavigation();
  const {loading, error, data} = useQuery<LinesData>(GET_LINES_QUERY);
  const {t} = useTranslation();
  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (error) {
    return <BodyCopy>{error.message}</BodyCopy>;
  }

  const onLineCardPress = (line: Line) => {
    navigation.navigate(
      // @ts-ignore
      EDIT_ANSWER,
      {
        title: line.question.text,
        questionId: line.question.id,
        answer: line.answer.text,
        headerBackTitle: PROFILE,
      },
    );
  };
  return (
    <View style={styles.container}>
      <ActionHeader
        title={t('app.profile.lines')}
        linkTitle={t('app.profile.addNewLine')}
        // @ts-ignore
        onLinkPress={() => navigation.navigate(CATEGORIES)}
        containerStyle={styles.linesHeading}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.linesContainer}>
        {data &&
          data.me.lines.map(line => (
            <LineCard
              line={line}
              key={line.id}
              onPress={() => onLineCardPress(line)}
            />
          ))}
        {data?.me.lines.length === 0 && (
          <AddLine onPress={() => navigation.navigate(CATEGORIES)} />
        )}
      </ScrollView>
    </View>
  );
};
