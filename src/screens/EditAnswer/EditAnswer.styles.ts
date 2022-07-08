import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  inputContainer: {
    flex: 1,
    backgroundColor: '$background',
    paddingVertical: 16,
  },

  paddingContainer: {
    flex: 1,
  },

  input: {
    fontSize: '$bcLarge',
    lineHeight: '$h3',
    color: '$gray',
  },

  formContainer: {
    flexGrow: 1,
    flexDirection: 'column',
  },

  submitButton: {marginTop: 'auto', marginBottom: 32},
});
