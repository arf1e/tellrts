import {useQuery} from '@apollo/client';
import React from 'react';
import {View} from 'react-native';
import Reanimated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutDown,
  SlideInDown,
} from 'react-native-reanimated';
import LoadingIndicator from '../../components/LoadingIndicator';
import ImpressionsResult from '../RequestResult/RequestResult.Impressions';
import ProfilingResult from '../RequestResult/RequestResult.Profiling';
import {SeeRequestResult, SEE_REQUEST_QUERY} from './Contact.graphql';
import GuessesResult from '../../screens/RequestResult/RequestResult.Guesses';
import styles from './Contact.styles';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

type Props = {
  requestId: number;
};

const ContactAnket = ({requestId}: Props) => {
  const {error, loading, data} = useQuery<
    SeeRequestResult,
    {requestId: number}
  >(SEE_REQUEST_QUERY, {variables: {requestId}});
  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <ReanimatedView
      entering={FadeInDown.duration(320).delay(320)}
      exiting={FadeOutDown.duration(320).damping(320)}
      style={styles.anketContainer}>
      {data?.seeRequest.impressions && (
        <ImpressionsResult
          impressions={data?.seeRequest.impressions}
          sex={data?.seeRequest.to.sex ? 'male' : 'female'}
        />
      )}
      <ProfilingResult
        takes={[
          {
            title: 'Name',
            answer: data?.seeRequest.name,
            isCorrect: data?.seeRequest.isNameCorrect,
          },
        ]}
      />
      <GuessesResult guesses={data?.seeRequest.guesses} />
    </ReanimatedView>
  );
};

export default ContactAnket;
