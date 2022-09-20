import {useQuery} from '@apollo/client';
import React from 'react';
import {View, Image} from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

import {PHOTO_QUERY} from './Profile.graphql';
import PrimaryInfo from './Profile.Info';
import SettingsButton from './Profile.SettingsButton';
import styles from './Profile.styles';

type PhotoData = {
  me: {
    photo: string;
  };
};

const ProfileImage = () => {
  const {data: photoData} = useQuery<PhotoData>(PHOTO_QUERY);

  return (
    <>
      <FocusAwareStatusBar backgroundColor="transparent" translucent={true} />
      <Image
        style={styles.headerPhoto}
        defaultSource={require('../../assets/image-cap.png')}
        source={{uri: photoData?.me.photo}}
        resizeMode="cover"
      />
    </>
  );
};

const ProfileHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <ProfileImage />
      <SettingsButton />
      <PrimaryInfo />
    </View>
  );
};

export default ProfileHeader;
