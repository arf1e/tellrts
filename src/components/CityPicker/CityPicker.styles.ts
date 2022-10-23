import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  input: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  inputTitle: {
    marginRight: 8,
    fontSize: '$bcBig',
  },

  utilForm: {
    flex: 1,
  },

  separator: {
    width: '100%',
    height: 0.4,
    backgroundColor: '$lightGray',
  },

  optionContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionContainerCity: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  optionTitle: {
    fontSize: '$bcLarge',
    maxWidth: 240,
  },

  flag: {
    fontSize: '$h3',
    marginRight: 16,
  },

  countryConfirmBtn: {
    marginTop: 32,
  },

  countryConfirmBtnEmoji: {
    fontSize: '$h4',
    marginLeft: 16,
  },

  cityContainer: {
    marginTop: 32,
  },

  cityApplyBtn: {
    marginTop: 32,
  },

  locationSubtitle: {
    fontSize: '$h4',
    marginBottom: 4,
  },
});
