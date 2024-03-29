import StyleSheet from 'react-native-extended-stylesheet';

export default StyleSheet.create({
  background: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingTop: '20%',
    backgroundColor: '$primary',
    flex: 1,
  },

  logo: {
    width: 200,
    marginBottom: 24,
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

  formBtn: {
    marginTop: 16,
  },

  formError: {
    fontSize: '$bcMedium',
    lineHeight: 20,
    color: '$bad',
  },
});
