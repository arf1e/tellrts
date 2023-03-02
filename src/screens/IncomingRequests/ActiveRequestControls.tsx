import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './IncomingRequests.styles';
import Reanimated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  Layout,
} from 'react-native-reanimated';
import colors from '../../utils/colors';
import IgnoreIncomingRequestBtn from './IgnoreBtn';
import AcceptIncomingRequestBtn from './AcceptBtn';
import {useDispatch} from 'react-redux';
import {useBottomSheetModal} from '@gorhom/bottom-sheet/src';
import {Anket, GetAnketResult, GET_ANKET_QUERY} from '../Search/Search.graphql';
import {setAnket} from '../../utils/slices/anketSlice';
import {setRequestStateFilling} from '../../utils/slices/requestStateSlice';
import {useLazyQuery} from '@apollo/client';
import errorCatcher from '../../utils/toasts';
import Container from '../../components/Container';
import animationConstants from '../../utils/animationConstants';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const RequestControls = ({
  userId,
  requestId,
}: {
  userId: number;
  requestId: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (value: boolean) => setIsLoading(value);

  const dispatch = useDispatch();
  const {dismiss: dismissModal} = useBottomSheetModal();

  const acceptIncomingRequest = async (anket: Anket) => {
    await dismissModal();
    dispatch(setAnket({anket}));
    dispatch(setRequestStateFilling());
  };

  const [getAnket, {refetch: refetchGetAnket, called: getAnketCalled}] =
    useLazyQuery<GetAnketResult>(GET_ANKET_QUERY, {
      onCompleted: async data => {
        setLoading(false);
        const anket = data.getAnket;
        await acceptIncomingRequest(anket);
      },

      onError: e => {
        setLoading(false);
        errorCatcher(e);
      },

      variables: {
        id: userId,
      },

      refetchWritePolicy: 'overwrite',

      fetchPolicy: 'network-only',
    });

  const handleRefetch = () => {
    refetchGetAnket().catch(e => {
      setLoading(false);
      errorCatcher(e);
    });
  };

  const onPressAccept = () => {
    setLoading(true);
    if (getAnketCalled) {
      handleRefetch();
      return;
    }
    getAnket();
  };

  return (
    <View style={styles.activeRequestControlsContainer}>
      <Container>
        {isLoading && (
          <AnimatedView
            style={styles.activeRequestLoading}
            entering={FadeInUp.duration(animationConstants.BUTTON_IN / 2)}
            exiting={FadeOutUp}>
            <ActivityIndicator size={32} color={colors.primary} />
          </AnimatedView>
        )}
        {!isLoading && (
          <AnimatedView
            layout={Layout}
            exiting={FadeOutDown}
            style={styles.activeRequestControls}>
            <IgnoreIncomingRequestBtn
              setLoading={setLoading}
              requestId={requestId}
            />
            <AcceptIncomingRequestBtn onPress={onPressAccept} />
          </AnimatedView>
        )}
      </Container>
    </View>
  );
};

export default RequestControls;
