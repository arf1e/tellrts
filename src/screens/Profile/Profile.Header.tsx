import {useQuery} from '@apollo/client';
import React from 'react';
import {View} from 'react-native';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {PinchablePhoto} from '../../components/PinchablePhoto';

import {PHOTO_QUERY} from './Profile.graphql';
import PrimaryInfo from './Profile.Info';
import SettingsButton from './Profile.SettingsButton';
import styles from './Profile.styles';

type PhotoData = {
  me: {
    photo: string;
  };
};

const ProfileImage = ({hiddenShared}: {hiddenShared: SharedValue<number>}) => {
  const {data: photoData} = useQuery<PhotoData>(PHOTO_QUERY);

  return (
    <View style={{overflow: 'hidden'}}>
      <PinchablePhoto
        style={styles.headerPhoto}
        hideableShared={hiddenShared}
        source={{uri: photoData?.me.photo}}
      />
    </View>
  );
};

const ProfileHeader = () => {
  const shownSettingsButtonShared = useSharedValue(1);
  return (
    <View style={styles.headerContainer}>
      <ProfileImage hiddenShared={shownSettingsButtonShared} />
      <SettingsButton hiddenShared={shownSettingsButtonShared} />
      <PrimaryInfo />
    </View>
  );
};

export default ProfileHeader;
