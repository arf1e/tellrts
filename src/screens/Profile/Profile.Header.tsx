import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Pressable,
  StatusBar,
} from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import Container from '../../components/Container';
import {SETTINGS} from '../../components/Navigation/ProfileNavigator';
import {BodyCopy, Subtitle, Title} from '../../components/Typography';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';
import getAge from '../../utils/getAge';

import {PHOTO_QUERY, PRIMARY_INFO_QUERY} from './Profile.graphql';
import styles from './Profile.styles';

type PhotoData = {
  me: {
    photo: string;
  };
};

type PrimaryInfoData = {
  me: {
    name: string;
    bio: string;
    birthday: string;
    cityTitle: string;
  };
};

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const SettingsActivityButton = () => {
  const pressedShared = useSharedValue(0);

  const {navigate} = useNavigation();

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        pressedShared.value,
        [0, 1],
        [colors.primary, colors.unsaturatedPrimary],
      ),
      transform: [
        {
          scale: interpolate(
            pressedShared.value,
            [0, 1],
            [1, animationConstants.SCALE_ON_PRESS],
          ),
        },
      ],
    }),
    [pressedShared],
  );

  const pressableStyle = [styles.profileSettingsButton, animatedStyle];

  const onPressIn = () => {
    pressedShared.value = withTiming(1, {
      duration: animationConstants.BUTTON_IN,
    });
  };

  const onPressOut = () => {
    pressedShared.value = withTiming(0, {
      duration: animationConstants.BUTTON_OUT,
    });
  };

  //@ts-ignore
  const onPress = () => navigate(SETTINGS);

  return (
    <ReanimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={pressableStyle}>
      <Icon name="settings-outline" color={colors.background} size={30} />
    </ReanimatedPressable>
  );
};

const ProfileImage = () => {
  const {loading: photoLoading, data: photoData} =
    useQuery<PhotoData>(PHOTO_QUERY);

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      {photoLoading ||
        (!photoData?.me && (
          <View style={styles.headerPhoto}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ))}
      {photoData?.me && (
        <Image
          style={styles.headerPhoto}
          source={{uri: photoData?.me.photo}}
          resizeMode="cover"
        />
      )}
    </>
  );
};

const PrimaryInfo = () => {
  const [isErrored, setIsErrored] = useState(false);
  const {
    loading: primaryInfoLoading,
    data: primaryInfoData,
    error,
  } = useQuery<PrimaryInfoData>(PRIMARY_INFO_QUERY, {
    onError: () => {
      setIsErrored(true);
    },
  });

  const name = primaryInfoData?.me.name;
  const birthday = primaryInfoData?.me.birthday;
  const cityTitle = primaryInfoData?.me.cityTitle;
  const age = birthday && getAge(birthday);
  if (primaryInfoLoading) {
    return <BodyCopy>ass)</BodyCopy>;
  }
  return (
    <Container>
      <Subtitle style={styles.primaryInfo}>{`${name}, ${age}`}</Subtitle>
      <BodyCopy style={styles.cityTitle}>{cityTitle}</BodyCopy>
      <BodyCopy style={styles.bio}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut iste
        explicabo, dolorem minima adipisci molestiae maxime culpa nesciunt
        placeat, quisquam, labore sapiente quos quod iusto beatae praesentium
        natus necessitatibus commodi?
      </BodyCopy>
    </Container>
  );
};

const ProfileHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <ProfileImage />
      <SettingsActivityButton />
      <PrimaryInfo />
    </View>
  );
};

export default ProfileHeader;
