import React, {useEffect, useState} from 'react';
import {BackHandler, Image, ScrollView, Text, View} from 'react-native';
import Reanimated, {
  FadeIn,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';

import styles from './RequestResult.styles';
import {BodyCopy, Subtitle} from '../../components/Typography';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import {useQuery} from '@apollo/client';
import {SeeRequestResult, SEE_REQUEST_QUERY} from './RequestResult.graphql';
import ImpressionsResult from './RequestResult.Impressions';
import GuessesResult from './RequestResult.Guesses';
import ProfilingResult, {Assumption} from './RequestResult.Profiling';
import ReviewTip from './RequestResult.Tip';
import {useDispatch, useSelector} from 'react-redux';
import {SEARCH} from '../../components/Navigation/SearchNavigator';
import {clearAnket} from '../../utils/slices/anketSlice';
import {useTranslation} from 'react-i18next';
import {
  clearRequestResult,
  RequestResultState,
} from '../../utils/slices/requestResultSlice';
import {setRequestStateIdle} from '../../utils/slices/requestStateSlice';
import {getSuccessRateText} from './RequestResult.utils';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const STATE_IDLE = 'IDLE';
const STATE_CHECK_REQUEST = 'CHECK REQUEST';

type SCREEN_STATE = typeof STATE_IDLE | typeof STATE_CHECK_REQUEST;
const AnketFlash = ({
  successRate,
  showRequest,
  quitAnket,
}: {
  successRate: number;
  showRequest: () => void;
  quitAnket: () => void;
}) => {
  const {title: scoreTitle, description: scoreDescription} =
    getSuccessRateText(successRate);
  const {t} = useTranslation();
  return (
    <AnimatedView
      entering={SlideInRight.delay(140).duration(280).springify().damping(100)}
      exiting={SlideOutLeft.delay(140).duration(250)}
      style={styles.resultCardContainer}>
      <AnimatedView
        entering={FadeIn.delay(800).duration(300)}
        style={styles.resultDisplay}>
        <Text style={styles.correctAnswers}>{`${successRate}%`}</Text>
      </AnimatedView>
      <Subtitle style={styles.resultCardHeading}>{t(scoreTitle)}</Subtitle>
      <BodyCopy style={styles.resultCardContent}>
        {t(scoreDescription)}
      </BodyCopy>
      <View style={styles.resultCardControls}>
        <PrimaryButton
          onPress={showRequest}
          title={t('app.anket.flashActions.seeRequest')}
          style={styles.resultCardPrimaryBtn}
        />
        <SecondaryButton
          onPress={quitAnket}
          title={t('app.anket.flashActions.toIndex')}
        />
      </View>
    </AnimatedView>
  );
};
const AnketReview = ({
  requestId,
  onButtonPress,
}: {
  requestId: number;
  onButtonPress: () => void;
}) => {
  const {t} = useTranslation();
  const {
    loading: requestLoading,
    data,
    error,
  } = useQuery<SeeRequestResult>(SEE_REQUEST_QUERY, {
    variables: {id: requestId},
  });

  const profilingTakes: Assumption[] = [
    {
      title: 'Name',
      // @ts-ignore
      answer: data?.seeRequest.name,
      isCorrect: data?.seeRequest.name === data?.seeRequest.to.name,
    },
  ];
  return (
    <AnimatedView
      style={styles.anketReviewContainer}
      entering={SlideInRight.delay(280).duration(280)}
      exiting={SlideOutLeft.delay(140).duration(280)}>
      <View style={styles.profileInfoContainer}>
        <Image
          source={{uri: data?.seeRequest.to.photo}}
          style={styles.profileInfoPhoto}
          defaultSource={require('../../assets/image-cap.png')}
        />
      </View>
      {profilingTakes && <ProfilingResult takes={profilingTakes} />}
      {data?.seeRequest.impressions && (
        <ImpressionsResult
          impressions={data?.seeRequest.impressions}
          sex={data.seeRequest.to.sex ? 'male' : 'female'}
        />
      )}
      {data?.seeRequest.guesses && (
        <GuessesResult guesses={data.seeRequest.guesses} />
      )}
      <ReviewTip
        buttonTitle={t('app.anket.tip.button')}
        text={t('app.anket.tip.description')}
        onPress={onButtonPress}
      />
    </AnimatedView>
  );
};

const RequestResult = () => {
  const requestResult = useSelector(
    (state: {requestResult: RequestResultState}) =>
      state.requestResult.requestResult,
  );
  const dispatch = useDispatch();

  const [state, setState] = useState<SCREEN_STATE>(STATE_IDLE);

  const showRequest = () => setState(STATE_CHECK_REQUEST);
  const quitAnket = () => {
    dispatch(setRequestStateIdle());
    dispatch(clearAnket());
    dispatch(clearRequestResult());
    // @ts-ignore
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={styles.screenScroll}>
      {state === STATE_IDLE && (
        <AnketFlash
          //@ts-ignore
          successRate={requestResult?.successRate}
          showRequest={showRequest}
          quitAnket={quitAnket}
        />
      )}
      {state === STATE_CHECK_REQUEST && (
        // @ts-ignore
        <AnketReview
          requestId={requestResult?.requestId}
          onButtonPress={quitAnket}
        />
      )}
    </ScrollView>
  );
};

export default RequestResult;
