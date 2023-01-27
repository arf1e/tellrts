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
import {useTranslation} from 'react-i18next';
import {UpdateCity} from '../../screens/UpdateCity';
import Socials from '../../screens/Socials';
import AttachInstagram from '../../screens/AttachInstagram';
import UpdateLanguage from '../../screens/UpdateLanguage';
import AttachTelegram from '../../screens/AttachTelegram';

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
export const UPDATE_CITY = 'Update City';
export const SOCIALS = 'Socials';
export const ATTACH_INSTAGRAM = 'Attach Instagram';
export const UPDATE_LANGUAGE = 'Update Language';
export const ATTACH_TELEGRAM = 'Attach Telegram';

const ProfileNavigator = () => {
  const {t} = useTranslation();
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        name={PROFILE}
        component={Profile}
        options={{header: () => null, title: t('navigation.PROFILE_NAVIGATOR')}}
      />
      <ProfileStackNavigator.Screen
        name={SETTINGS}
        component={Settings}
        options={{
          header: props => <Header {...props} />,
          title: t('navigation.SETTINGS'),
        }}
      />
      <ProfileStackNavigator.Screen
        name={CATEGORIES}
        component={Categories}
        options={{
          header: props => <Header {...props} />,
          title: t('navigation.CATEGORIES'),
        }}
      />
      <ProfileStackNavigator.Screen
        name={STATISTICS}
        component={Statistics}
        options={{
          header: props => <Header {...props} />,
          title: t('navigation.STATISTICS'),
        }}
      />
      <ProfileStackNavigator.Screen
        name={QUESTIONS}
        component={Questions}
        options={{
          header: props => (
            // @ts-ignore
            <Header {...props} options={{title: props.route.params.title}} />
          ),
          title: t('navigation.QUESTIONS'),
        }}
      />
      <ProfileStackNavigator.Screen
        name={EDIT_ANSWER}
        component={EditAnswer}
        options={{
          header: () => null,
          headerBackTitle: t('navigation.PROFILE_NAVIGATOR'),
          title: t('navigation.EDIT_ANSWER'),
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
          title: t('navigation.UPDATE_BIO'),
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
          title: t('navigation.UPDATE_PASSWORD'),
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
          title: t('navigation.UPDATE_PHOTO'),
        }}
      />
      <ProfileStackNavigator.Screen
        name={UPDATE_CITY}
        component={UpdateCity}
        options={{
          header: props => (
            // @ts-ignore
            <Header {...props} />
          ),
          title: t('navigation.UPDATE_CITY'),
        }}
      />
      <ProfileStackNavigator.Screen
        name={SOCIALS}
        component={Socials}
        options={{
          header: props => (
            // @ts-ignore
            <Header {...props} />
          ),
          title: t('navigation.SOCIALS'),
        }}
      />
      <ProfileStackNavigator.Screen
        name={ATTACH_INSTAGRAM}
        component={AttachInstagram}
        options={{
          header: props => (
            // @ts-ignore
            <Header {...props} />
          ),
          presentation: 'modal',
          title: t('navigation.ATTACH_INSTAGRAM'),
        }}
      />
      <ProfileStackNavigator.Screen
        name={UPDATE_LANGUAGE}
        component={UpdateLanguage}
        options={{
          header: props => (
            // @ts-ignore
            <Header {...props} />
          ),
          title: t('navigation.UPDATE_LANGUAGE'),
        }}
      />
      <ProfileStackNavigator.Screen
        name={ATTACH_TELEGRAM}
        component={AttachTelegram}
        options={{
          header: props => (
            // @ts-ignore
            <Header {...props} />
          ),
          title: t('navigation.ATTACH_TELEGRAM'),
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileNavigator;
