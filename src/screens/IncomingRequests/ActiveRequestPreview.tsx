import React from 'react';
import {View, Platform, Dimensions} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator/src';
import Container from '../../components/Container';
import PhotosBioScroller from '../../components/PhotosBioScroller';
import {Subtitle} from '../../components/Typography';
import colors from '../../utils/colors';
import {TIncomingRequest} from './IncomingRequests.graphql';
import styles from './IncomingRequests.styles';
import ImpressionsPreview from './IncomingRequests.ImpressionsPreview';

const RequestPreview = ({request}: {request: TIncomingRequest}) => {
  return (
    <View style={styles.activeRequestContainer}>
      <PhotosBioScroller
        slides={[
          {type: 'image', url: request.from.photo},
          {type: 'text', content: request.from.bio},
        ]}
        pinchable={Platform.OS === 'android' ? false : true}
      />
      <Container>
        <View style={styles.activeRequestInfo}>
          <View
            style={[
              styles.activeRequestSection,
              styles.activeRequestSuccessRate,
            ]}>
            <Subtitle
              style={[
                styles.activeRequestSubtitle,
                styles.activeRequestGuessesSubtitle,
              ]}>
              Correct guesses
            </Subtitle>
            <CircularProgress
              value={request.successRate}
              radius={32}
              inActiveStrokeColor={colors.secondary}
              activeStrokeColor={colors.primary}
              inActiveStrokeOpacity={0.2}
              progressValueStyle={styles.successRateValueText}
              valueSuffix={'%'}
            />
          </View>
          <View
            style={[
              styles.activeRequestSection,
              styles.activeRequestImpressions,
            ]}>
            <Subtitle style={styles.activeRequestSubtitle}>
              First Impression
            </Subtitle>
            <ImpressionsPreview
              impressions={['pretty', 'cute', 'hot', 'shy', 'art', 'party']}
              sex={request.to.sex}
            />
          </View>
        </View>
      </Container>
    </View>
  );
};

export default RequestPreview;
