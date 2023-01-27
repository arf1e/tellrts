import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '$background',
  },

  code: {
    fontSize: '$h1',
    fontFamily: 'Roboto-Medium',
    letterSpacing: 4,
    textAlign: 'center',
  },

  codeContainer: {
    marginTop: 24,
  },

  codeInstructions: {
    color: '$gray',
    marginTop: 8,
    marginBottom: 12,
    textAlign: 'center',
  },
});
