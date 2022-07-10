import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  inputContainer: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '$background',
    height: '90%',
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

  formContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  lengthCounter: {
    marginVertical: 8,
    alignSelf: 'flex-end',
    fontSize: '$bcMedium',
    color: '$gray',
  },

  incorrectLength: {
    color: '$bad',
  },

  correctLength: {
    color: '$good',
  },

  submitButton: {marginTop: 'auto'},
});
