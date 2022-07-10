import {useQuery} from '@apollo/client';
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
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import Container from '../../components/Container';
import FullScreenModal from '../../components/Modals';
import {ANKET} from '../../components/Navigation/SearchNavigator';
import {BodyCopy} from '../../components/Typography';
import colors from '../../utils/colors';
import {SearchQueryResult, SEARCH_USERS_QUERY, User} from './Search.graphql';
import styles from './Search.styles';

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
  const {t} = useTranslation();
  const navigation = useNavigation();

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

  const onProceedUserModal = () => {
    // @ts-ignore
    navigation.navigate(ANKET, {user: activeUser});
    setIsUserModalActive(false);
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

  const renderActiveUserModalBody = (
    user: User,
    onClose: () => void,
    onNext: () => void,
  ) => {
    return (
      <View style={styles.activeUserModalContainer}>
        <View style={styles.activeUserModalContent}>
          <Image
            source={{uri: user.photo}}
            style={styles.activeUserModalPhoto}
          />
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
            onPress={onNext}
            title={t('app.search.modalStart')}
            style={styles.activeUserModalPrimaryButton}
          />
        </View>
      </View>
    );
  };

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
          {activeUser &&
            renderActiveUserModalBody(
              activeUser,
              onCloseUserModal,
              onProceedUserModal,
            )}
        </FullScreenModal>
      </Container>
    </ScrollView>
  );
};

export default SearchUsers;
