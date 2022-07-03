import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },

  centerContainer: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '$background',
  },
});
