import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../../components/Container';
import ErrorWithImage from '../../components/ErrorWithImage';
import FullScreenModal from '../../components/Modals';
import colors from '../../utils/colors';
import {setAnket} from '../../utils/slices/anketSlice';
import {setRequestStateFilling} from '../../utils/slices/requestStateSlice';
import {SearchSettingsState} from '../../utils/slices/searchSettingsSlice';
import ActiveUser from './Search.ActiveUser';
import {
  Anket,
  SearchQueryResult,
  SEARCH_USERS_QUERY,
  User,
} from './Search.graphql';
import NoSearchResult from './Search.NoResult';
import styles from './Search.styles';
import UserCard from './Search.UserCard';

// Screen States
const LOADING = 'LOADING';
const LIST = 'LIST';
const EMPTY = 'EMPTY';
const ERROR = 'ERROR';

type SCREEN_STATE = typeof LOADING | typeof LIST | typeof EMPTY | typeof ERROR;

const SearchUsers = () => {
  // --- REDUX STORE
  const {location} = useSelector(
    (state: {searchSettings: SearchSettingsState}) => state.searchSettings,
  );
  // --- SERVICE
  const dispatch = useDispatch();
  const {t} = useTranslation();
  // --- STATE
  const [screenState, setScreenState] = useState<SCREEN_STATE>(LOADING);
  const [isUserModalActive, setIsUserModalActive] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const {data, refetch: refreshUsersList} = useQuery<SearchQueryResult>(
    SEARCH_USERS_QUERY,
    {
      variables: {location},
      fetchPolicy: 'network-only',
      onCompleted(queryResult) {
        if (queryResult.searchUsers.length > 0) {
          setScreenState(LIST);
          return;
        }

        setScreenState(EMPTY);
      },

      onError: () => {
        setScreenState(ERROR);
        return;
      },

      notifyOnNetworkStatusChange: true,
    },
  );

  // ---  ACTIONS
  const onUserCardClick = (user: User) => {
    setActiveUser(user);
    setIsUserModalActive(true);
  };

  const onCloseUserModal = () => {
    setIsUserModalActive(false);
    setActiveUser(null);
  };

  const handleSelectUser = async (anket: Anket) => {
    await onCloseUserModal();
    dispatch(setAnket({anket}));
    dispatch(setRequestStateFilling());
  };

  const onRefresh = async () => {
    setScreenState(LOADING);
    try {
      await refreshUsersList().then(response => {
        if (response.data.searchUsers.length > 0) {
          setScreenState(LIST);
          return;
        }

        setScreenState(EMPTY);
      });
    } catch (e) {
      setScreenState(ERROR);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={screenState === LOADING}
          tintColor={colors.primary}
          titleColor={colors.primary}
          colors={[colors.secondary, colors.primary]}
        />
      }>
      {screenState === EMPTY && <NoSearchResult />}
      {screenState === ERROR && (
        <ErrorWithImage
          title={t('app.search.error.title')}
          description={t('app.search.error.description')}
        />
      )}
      <Container>
        {screenState === LIST && (
          <View style={styles.userCardsContainer}>
            {data?.searchUsers.map(user => (
              <UserCard
                user={user}
                key={user.id}
                onPress={() => onUserCardClick(user)}
              />
            ))}
          </View>
        )}
        <FullScreenModal
          active={isUserModalActive}
          closeModal={onCloseUserModal}
          title="User">
          {activeUser && (
            <ActiveUser
              user={activeUser}
              onClose={onCloseUserModal}
              onProceed={handleSelectUser}
            />
          )}
        </FullScreenModal>
      </Container>
    </ScrollView>
  );
};

export default SearchUsers;
