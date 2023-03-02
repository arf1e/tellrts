import {useQuery} from '@apollo/client';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet/src';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import Container from '../../components/Container';
import RequestUserCard from '../../components/RequestUserCard';
import colors from '../../utils/colors';
import RequestControls from './ActiveRequestControls';
import RequestPreview from './ActiveRequestPreview';
import {
  INCOMING_REQUESTS_QUERY,
  INCOMING_REQUESTS_RESPONSE,
  TIncomingRequest,
} from './IncomingRequests.graphql';
import styles from './IncomingRequests.styles';

const LOADING = 'LOADING';
const LIST = 'LIST';
const EMPTY = 'EMPTY';
const ERROR = 'ERROR';

type TIncomingRequestState =
  | typeof LIST
  | typeof LOADING
  | typeof EMPTY
  | typeof ERROR;

const RequestsList = () => {
  const [state, setState] = useState<TIncomingRequestState>(LOADING);
  const [cursor, setCursor] = useState<number | null>(null);
  const [activeRequest, setActiveRequest] = useState<TIncomingRequest | null>(
    null,
  );
  const {data, refetch: refetchUsersList} =
    useQuery<INCOMING_REQUESTS_RESPONSE>(INCOMING_REQUESTS_QUERY);
  const modalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['85%'], []);

  // Bottom Sheet Functions
  const openBottomSheet = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const handleRequestSelection = (request: TIncomingRequest) => {
    setActiveRequest(request);
    openBottomSheet();
  };

  const handleDismissBottomSheet = () => {
    setActiveRequest(null);
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style, {backgroundColor: colors.primary}]}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  return (
    <View style={styles.listContainer}>
      <Container>
        <FlatList
          style={styles.listContainer}
          columnWrapperStyle={styles.cardsRow}
          data={data?.seeIncomingRequests}
          numColumns={2}
          renderItem={({item: request}) => (
            <RequestUserCard
              request={request}
              onPress={() => handleRequestSelection(request)}
            />
          )}
        />
      </Container>
      <BottomSheetModal
        enablePanDownToClose={true}
        name="incoming-request-sheet"
        footerComponent={() =>
          activeRequest ? (
            <RequestControls
              userId={activeRequest.from.id}
              requestId={activeRequest.id}
            />
          ) : null
        }
        backdropComponent={renderBackdrop}
        onDismiss={handleDismissBottomSheet}
        snapPoints={snapPoints}
        ref={modalRef}
        index={0}>
        <View style={styles.activeRequestBottomSheetContainer}>
          {activeRequest && <RequestPreview request={activeRequest} />}
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default RequestsList;
