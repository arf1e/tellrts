import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  chatContainerStream: {
    flex: 1,
    backgroundColor: '$background',
  },

  chatLoaderContainer: {
    flex: 1,
    backgroundColor: '$background',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatLoaderText: {
    marginTop: 12,
    fontFamily: 'Roboto-Regular',
    fontSize: '$bcMedium',
  },
});
