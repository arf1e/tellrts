import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import Reanimated, {
  FadeIn,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';

import Header from '../../components/Header';
import styles from './RequestResult.styles';
import {BodyCopy, Subtitle} from '../../components/Typography';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import {useQuery} from '@apollo/client';
import {SeeRequestResult, SEE_REQUEST_QUERY} from './RequestResult.graphql';
import {duration} from 'moment';
import ImpressionsResult from './RequestResult.Impressions';
import GuessesResult from './RequestResult.Guesses';
import ProfilingResult, {Assumption} from './RequestResult.Profiling';
import ReviewTip from './RequestResult.Tip';
import {useDispatch} from 'react-redux';
import {SEARCH} from '../../components/Navigation/AppNavigator';
import {clearAnket} from '../../utils/slices/anketSlice';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const STATE_IDLE = 'IDLE';
const STATE_CHECK_REQUEST = 'CHECK REQUEST';

type SCREEN_STATE = typeof STATE_IDLE | typeof STATE_CHECK_REQUEST;

const AnketReview = ({
  requestId,
  onButtonPress,
}: {
  requestId: number;
  onButtonPress: () => void;
}) => {
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
      answer: data?.seeRequest.name,
      isCorrect: data?.seeRequest.name === data?.seeRequest.to.name,
    },
  ];
  return (
    <AnimatedView
      style={styles.anketReviewContainer}
      entering={SlideInRight.delay(140).duration(280)}
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
        <ImpressionsResult impressions={data?.seeRequest.impressions} />
      )}
      {data?.seeRequest.guesses && (
        <GuessesResult guesses={data.seeRequest.guesses} />
      )}
      <ReviewTip
        buttonTitle="В начало"
        text="Правильные ответы и доступ к чату с пользователем станут доступны после встречной заявки."
        onPress={onButtonPress}
      />
    </AnimatedView>
  );
};

const RequestResult = () => {
  const params = useRoute().params;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [state, setState] = useState<SCREEN_STATE>(STATE_IDLE);

  const showRequest = () => setState(STATE_CHECK_REQUEST);
  const quitAnket = () => {
    dispatch(clearAnket());
    navigation.navigate(SEARCH, {screen: 'Search Index'});
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={styles.screenScroll}>
      {state === STATE_IDLE && (
        <AnimatedView
          entering={SlideInRight.delay(140)
            .duration(280)
            .springify()
            .damping(100)}
          exiting={SlideOutLeft.delay(140).duration(250)}
          style={styles.resultCardContainer}>
          <AnimatedView
            entering={FadeIn.delay(800).duration(300)}
            style={styles.resultDisplay}>
            <Text style={styles.correctAnswers}>4</Text>
            <Text style={styles.totalAnswers}>out of 5</Text>
          </AnimatedView>
          <Subtitle style={styles.resultCardHeading}>
            Вы восхитительны!
          </Subtitle>
          <BodyCopy style={styles.resultCardContent}>
            {
              'Вы точно не знакомы? Почти все твои ответы оказались правильными. Мы уведомим пользователя о твоей заявке.'
            }
          </BodyCopy>
          <View style={styles.resultCardControls}>
            <PrimaryButton
              onPress={showRequest}
              title="Просмотреть заявку"
              style={styles.resultCardPrimaryBtn}
            />
            <SecondaryButton onPress={quitAnket} title="Вернуться в начало" />
          </View>
        </AnimatedView>
      )}
      {state === STATE_CHECK_REQUEST && (
        <AnketReview requestId={params.requestId} onButtonPress={quitAnket} />
      )}
    </ScrollView>
  );
};

export default RequestResult;
