import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
import {AVATAR_HEIGHT} from '../../utils/photos';

const {width: DEVICE_WIDTH} = Dimensions.get('screen');

export default EStyleSheet.create({
  profileContainer: {
    backgroundColor: '$background',
    paddingBottom: 32,
  },
  headerContainer: {},
  headerPhoto: {
    width: DEVICE_WIDTH,
    height: AVATAR_HEIGHT,
  },

  profileSettingsButton: {
    backgroundColor: '$primary',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 32,
    left: DEVICE_WIDTH - 80,
    zIndex: 100,
    marginBottom: -32,
  },

  primaryInfo: {
    color: '$darkGray',
    marginBottom: 8,
  },

  cityTitle: {
    fontSize: '$bcBig',
    color: '$darkGray',
    marginBottom: 16,
  },

  bio: {
    color: '$gray',
    fontSize: '$bcBig',
    lineHeight: '$h4',
  },
});
