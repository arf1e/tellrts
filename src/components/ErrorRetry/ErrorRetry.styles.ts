import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  errorContainer: {
    marginTop: 24,
  },

  errorHeading: {
    fontFamily: 'Roboto-Medium',
    color: '$darkGray',
    fontSize: '$bcLarge',
    marginBottom: 8,
  },

  errorDescription: {
    fontSize: '$bcMedium',
    lineHeight: '$bcLarge',
    marginBottom: 16,
  },

  errorIcon: {
    marginBottom: 32,
  },
});
