import {Platform, StatusBar} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  background: {
    backgroundColor: '$background',
  },

  screenTitle: {
    marginTop: 8,
    fontSize: 32,
    lineHeight: 32,
    color: '$darkGray',
  },

  headerContainer: {
    paddingBottom: 16,
    ...(Platform.OS === 'android' && {
      paddingTop: (StatusBar.currentHeight || 20) + 12,
      paddingBottom: 12,
    }),
  },

  topLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
