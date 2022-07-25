import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$background',
    paddingTop: 16,
  },

  description: {
    color: '$gray',
    fontSize: '$bcMedium',
    lineHeight: '$h3',
    marginBottom: 16,
  },

  formContainer: {
    marginTop: 16,
  },
});
