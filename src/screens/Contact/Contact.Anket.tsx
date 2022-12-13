import {useQuery} from '@apollo/client';
import React from 'react';
import {View} from 'react-native';
import Reanimated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import LoadingIndicator from '../../components/LoadingIndicator';
import {SeeRequestResult, SEE_REQUEST_QUERY} from './Contact.graphql';
import GuessesResult from '../../screens/RequestResult/RequestResult.Guesses';
import styles from './Contact.styles';
import {useTranslation} from 'react-i18next';
import SuccessRateCard from './SuccessRateCard';
import {ScrollView} from 'react-native-gesture-handler';
import ImpressionsCard from './ImpressionCard';
import ProfilingCard from './ProfilingCard';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

type Props = {
  requestId: number;
};

const ContactAnket = ({requestId}: Props) => {
  const {error, loading, data} = useQuery<
    SeeRequestResult,
    {requestId: number}
  >(SEE_REQUEST_QUERY, {variables: {requestId}});
  const {t} = useTranslation();
  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <ReanimatedView
      entering={FadeInDown.duration(320).delay(320)}
      exiting={FadeOutDown.duration(320).damping(320)}
      style={styles.anketContainer}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.cardsContainer}
        showsHorizontalScrollIndicator={false}>
        <ImpressionsCard impressions={data?.seeRequest.impressions} />
        <ProfilingCard
          takes={[
            {
              title: t('app.contact.takes.name'),
              answer: data?.seeRequest.name,
              isCorrect: data?.seeRequest.isNameCorrect,
            },
          ]}
        />
        <SuccessRateCard successRate={data?.seeRequest.successRate} />
      </ScrollView>
      <GuessesResult showAnswers={true} guesses={data?.seeRequest.guesses} />
    </ReanimatedView>
  );
};

export default ContactAnket;
