import StyleSheet from 'react-native-extended-stylesheet';

export default StyleSheet.create({
  background: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingTop: '20%',
    flex: 1,
  },

  logo: {
    width: 300,
    marginBottom: 32,
    alignSelf: 'center',
  },

  title: {
    color: '$background',
    fontSize: '$h1',
  },

  formContainer: {
    backgroundColor: '$background',
    padding: 16,
    paddingTop: 20,
    borderRadius: 5,
  },

  formTitle: {
    fontSize: '$h4',
    marginBottom: 32,
  },

  fieldTitle: {
    marginBottom: 7,
  },

  emailField: {
    marginBottom: 16,
  },

  emailBtn: {
    color: '$primary',
    fontSize: '$bcMedium',
    fontFamily: 'Roboto-Regular',
    marginBottom: 16,
  },
});
