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
    width: 300,
    marginBottom: 40,
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
    shadowColor: '$darkGray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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
