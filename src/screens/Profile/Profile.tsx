import React from 'react';
import {Pressable, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {BodyCopy, Title} from '../../components/Typography';
import {logOut} from '../../utils/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <Title>Profile Screen</Title>
      <Pressable onPress={() => dispatch(logOut())}>
        <BodyCopy>Log out</BodyCopy>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;
