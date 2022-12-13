import EStyleSheet from 'react-native-extended-stylesheet';
import {Platform} from 'react-native';

export default EStyleSheet.create({
  chatHeaderContainer: {
    backgroundColor: '$background',
    paddingTop: 48,
    paddingBottom: 12,
    zIndex: 10,
    ...(Platform.OS === 'ios' && {marginBottom: -40}),
    ...(Platform.OS === 'android' && {marginBottom: -20}),
  },

  chatHeaderUserPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    marginLeft: 16,
  },

  chatHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  chatHeaderUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  chatHeaderUserName: {
    color: '$black',
    fontSize: 20,
  },
});
