import {useLazyQuery, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import Container from '../../components/Container';
import FullScreenModal from '../../components/Modals';
import {ANKET} from '../../components/Navigation/SearchNavigator';
import {BodyCopy} from '../../components/Typography';
import useFiniteState from '../../hooks/useFiniteState';
import colors from '../../utils/colors';
import {setAnket} from '../../utils/slices/anketSlice';
import {
  Anket,
  GetAnketResult,
  GET_ANKET_QUERY,
  SearchQueryResult,
  SEARCH_USERS_QUERY,
  User,
} from './Search.graphql';
import styles from './Search.styles';

const ActiveUser = ({
  user,
  onClose,
  onProceed,
}: {
  user: User;
  onClose: () => void;
  onProceed: (anket: Anket) => void;
}) => {
  const {t} = useTranslation();

  const [state, {setLoading, setError, setIdle}, _, {LOADING}] =
    useFiniteState();

  const [getAnket] = useLazyQuery<GetAnketResult>(GET_ANKET_QUERY, {
    onCompleted: async data => {
      await setIdle();
      const anket = data.getAnket;
      onProceed(anket);
    },
    onError(error) {
      setError(error.message);
    },
  });

  const handleChooseUser = async () => {
    setLoading();
    await getAnket({variables: {id: user.id}});
  };

  return (
    <View style={styles.activeUserModalContainer}>
      <View style={styles.activeUserModalContent}>
        <Image source={{uri: user.photo}} style={styles.activeUserModalPhoto} />
        <BodyCopy style={styles.activeUserModalBioTitle}>
          {t('app.search.modalBio')}
        </BodyCopy>
        <ScrollView style={styles.activeUserModalBioContainer}>
          <BodyCopy style={styles.activeUserModalBio}>
            {user.bio ||
              'lorem ipsum dolor sit amet lorem ipsum dolor sit amet'}
          </BodyCopy>
        </ScrollView>
      </View>
      <View style={styles.activeUserModalControls}>
        <SecondaryButton
          onPress={onClose}
          title={t('app.search.modalGoBack')}
          style={styles.activeUserModalCancelButton}
        />
        <PrimaryButton
          onPress={handleChooseUser}
          loading={state === LOADING}
          title={t('app.search.modalStart')}
          style={styles.activeUserModalPrimaryButton}
        />
      </View>
    </View>
  );
};

const UserCard = ({user, onPress}: {user: User; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.userCardContainer}>
        <Image source={{uri: user.photo}} style={styles.userCardImage} />
      </View>
    </Pressable>
  );
};

const SearchUsers = () => {
  // --- SERVICE
  const dispatch = useDispatch();
  // --- STATE
  const [refreshing, setRefreshing] = useState(false);
  const [isUserModalActive, setIsUserModalActive] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);

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
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshUsersList();
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
    }
  };

  const {
    error,
    loading,
    data,
    refetch: refreshUsersList,
  } = useQuery<SearchQueryResult>(SEARCH_USERS_QUERY);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          tintColor={colors.primary}
        />
      }>
      <Container>
        <View style={styles.userCardsContainer}>
          {data &&
            data.searchUsers.map(user => (
              <UserCard
                user={user}
                key={user.id}
                onPress={() => onUserCardClick(user)}
              />
            ))}
        </View>
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
