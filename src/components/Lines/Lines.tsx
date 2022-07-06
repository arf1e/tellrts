import React from 'react';
import {ActivityIndicator, Image, ScrollView, View} from 'react-native';
import ActionHeader from '../ActionHeader';
import styles from './Lines.styles';
import {useQuery} from '@apollo/client';

import GET_LINES_QUERY from './Lines.graphql';
import {BodyCopy} from '../Typography';
import colors from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {CATEGORIES} from '../Navigation/ProfileNavigator';

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

const LineCard = (line: Line) => {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.lineQuestionBadge}>
        <Image
          source={{uri: line.question.category.image}}
          style={styles.lineQuestionCategoryImage}
        />
        <BodyCopy style={styles.lineCategoryText}>
          {line.question.category.title}
        </BodyCopy>
      </View>
      <BodyCopy style={styles.lineQuestionText}>{line.question.text}</BodyCopy>
      <BodyCopy style={styles.lineAnswerText}>{line.answer.text}</BodyCopy>
    </View>
  );
};

export default () => {
  const navigation = useNavigation();
  const {loading, error, data} = useQuery<LinesData>(GET_LINES_QUERY);
  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (error) {
    return <BodyCopy>{error.message}</BodyCopy>;
  }
  return (
    <View style={styles.container}>
      <ActionHeader
        title="Questions & Answers"
        linkTitle="Add new"
        // @ts-ignore
        onLinkPress={() => navigation.navigate(CATEGORIES)}
        containerStyle={styles.linesHeading}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.linesContainer}>
        {data &&
          data.me.lines.map(line => <LineCard {...line} key={line.id} />)}
        {data &&
          data.me.lines.map(line => <LineCard {...line} key={line.id} />)}
        {data &&
          data.me.lines.map(line => <LineCard {...line} key={line.id} />)}
      </ScrollView>
    </View>
  );
};
