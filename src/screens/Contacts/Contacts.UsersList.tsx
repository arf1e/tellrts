import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, FlatList, FlatListProps} from 'react-native';
import {CONTACT} from '../../components/Navigation/ContactsNavigator';
import {GetContactsResult, GET_CONTACTS_QUERY} from './Contacts.graphql';
import styles from './Contacts.styles';

import Reanimated, {Layout} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {ContactsInputState} from '../../utils/slices/contactsInputSlice';
import UserIcon from './Contacts.UserIcon';
import {useTranslation} from 'react-i18next';
import ErrorWithImage from '../../components/ErrorWithImage';
import {User} from '../Search/Search.graphql';

const AnimatedView = Reanimated.createAnimatedComponent(View);
const AnimatedFlatList =
  Reanimated.createAnimatedComponent<FlatListProps<User>>(FlatList);

const LOADING = 'LOADING';
const LIST = 'LIST';
const ERROR = 'ERROR';

type SCREEN_STATE = typeof LOADING | typeof LIST | typeof ERROR;

const UsersList = () => {
  const [screenState, setScreenState] = useState<SCREEN_STATE>(LOADING);
  const {data, refetch: refreshUsersList} = useQuery<GetContactsResult>(
    GET_CONTACTS_QUERY,
    {
      onCompleted: () => {
        setScreenState(LIST);
      },

      onError: () => {
        setScreenState(ERROR);
      },

      notifyOnNetworkStatusChange: true,
    },
  );

  const navigation = useNavigation();
  const {t} = useTranslation();
  const {inputValue: contactsInputValue} = useSelector(
    (state: {contactsInput: ContactsInputState}) => state.contactsInput,
  );

  const handleRefresh = async () => {
    setScreenState(LOADING);
    await refreshUsersList()
      .then(() => setScreenState(LIST))
      .catch(() => setScreenState(ERROR));
  };

  const renderError = () => {
    return (
      <ErrorWithImage
        title={t('app.contacts.contactsList.error.title')}
        description={t('app.contacts.contactsList.error.description')}
        btnTitle={t('app.contacts.contactsList.error.retryBtnTitle')}
        btnOnPress={handleRefresh}
      />
    );
  };

  const handleUserPress = (userId: number) => {
    navigation.navigate(CONTACT, {userId});
  };

  const getProbablyFilteredUsers = () => {
    if (contactsInputValue) {
      return data?.findContacts.filter(user =>
        user.name.startsWith(contactsInputValue.trim()),
      );
    }

    return data?.findContacts;
  };

  return (
    <AnimatedView layout={Layout.springify()} style={styles.usersListContainer}>
      {screenState === ERROR && renderError()}
      {screenState !== ERROR && (
        <AnimatedFlatList
          data={getProbablyFilteredUsers()}
          onRefresh={handleRefresh}
          refreshing={screenState === LOADING}
          style={styles.usersListContainer}
          contentContainerStyle={styles.listScrollable}
          renderItem={({item: user}) => (
            <UserIcon
              user={user}
              onPress={() => handleUserPress(user.id)}
              key={user.id}
            />
          )}
        />
      )}
    </AnimatedView>
  );
};

export default UsersList;
