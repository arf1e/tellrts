import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../../screens/Profile';
import Settings from '../../screens/Settings';
import Header from '../Header';
import Categories from '../../screens/Categories';
import Statistics from '../../screens/Statistics';
import Questions from '../../screens/Questions';
import EditAnswer from '../../screens/EditAnswer';
import UpdateBio from '../../screens/UpdateBio';
import UpdatePassword from '../../screens/UpdatePassword';
import UpdatePhoto from '../../screens/UpdatePhoto';

const ProfileStackNavigator = createNativeStackNavigator();

export const SETTINGS = 'Settings';
export const PROFILE = 'Home';
export const CATEGORIES = 'Categories';
export const STATISTICS = 'Statistics';
export const QUESTIONS = 'Questions';
export const EDIT_ANSWER = 'EditAnswer';
export const UPDATE_BIO = 'Update Bio';
export const UPDATE_PHOTO = 'Update Photo';
export const UPDATE_PASSWORD = 'Update Password';

const ProfileNavigator = () => (
  <ProfileStackNavigator.Navigator>
    <ProfileStackNavigator.Screen
      name={PROFILE}
      component={Profile}
      options={{header: () => null}}
    />
    <ProfileStackNavigator.Screen
      name={SETTINGS}
      component={Settings}
      options={{header: props => <Header {...props} />}}
    />
    <ProfileStackNavigator.Screen
      name={CATEGORIES}
      component={Categories}
      options={{header: props => <Header {...props} />}}
    />
    <ProfileStackNavigator.Screen
      name={STATISTICS}
      component={Statistics}
      options={{header: props => <Header {...props} />}}
    />
    <ProfileStackNavigator.Screen
      name={QUESTIONS}
      component={Questions}
      options={{
        header: props => (
          // @ts-ignore
          <Header {...props} options={{title: props.route.params.title}} />
        ),
      }}
    />
    <ProfileStackNavigator.Screen
      name={EDIT_ANSWER}
      component={EditAnswer}
      options={{
        header: () => null,
      }}
    />
    <ProfileStackNavigator.Screen
      name={UPDATE_BIO}
      component={UpdateBio}
      options={{
        header: props => (
          // @ts-ignore
          <Header {...props} />
        ),
      }}
    />
    <ProfileStackNavigator.Screen
      name={UPDATE_PASSWORD}
      component={UpdatePassword}
      options={{
        header: props => (
          // @ts-ignore
          <Header {...props} />
        ),
      }}
    />
    <ProfileStackNavigator.Screen
      name={UPDATE_PHOTO}
      component={UpdatePhoto}
      options={{
        header: props => (
          // @ts-ignore
          <Header {...props} />
        ),
      }}
    />
  </ProfileStackNavigator.Navigator>
);

export default ProfileNavigator;
