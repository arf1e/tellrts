import React from 'react';
import {ScrollView, View} from 'react-native';
import Container from '../../components/Container';
import {Subtitle} from '../../components/Typography';
import styles from './RequestResult.styles';

type Props = {
  title: string;
  children: Element[];
};

const ReviewSection = ({title, children}: Props) => {
  return (
    <View style={styles.reviewSectionContainer}>
      <Container>
        <Subtitle style={styles.reviewSectionTitle}>{title}</Subtitle>
      </Container>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reviewSectionScroller}>
        {children}
      </ScrollView>
    </View>
  );
};

export default ReviewSection;
