import StyleSheet from 'react-native-extended-stylesheet';

export default StyleSheet.create({
  field: {
    height: 36,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '$secondary',
    padding: 8,
    fontSize: '$bcMedium',
    color: '$darkGray',
    fontFamily: 'Roboto-Regular',
  },

  fieldActive: {
    borderColor: '$primary',
  },

  formFieldContainer: {
    marginBottom: 16,
  },

  formFieldTitle: {
    marginBottom: 4,
  },
});
