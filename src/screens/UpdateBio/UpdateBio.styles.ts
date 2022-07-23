import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '$background',
  },

  paddingContainer: {
    flex: 1,
  },

  input: {
    fontSize: '$bcLarge',
    lineHeight: '$h3',
    color: '$darkGray',
    fontFamily: 'Roboto-Regular',
  },

  formContent: {
    flex: 1,
  },

  button: {
    marginTop: 'auto',
  },
});
