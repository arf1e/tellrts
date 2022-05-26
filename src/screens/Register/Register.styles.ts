import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '$background',
  },

  container: {
    flex: 1,
  },

  stepContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 25,
  },

  stepTitle: {
    marginTop: 16,
    marginBottom: 16,
  },

  stepDescription: {
    fontSize: '$bcBig',
    lineHeight: '$h4',
    color: '$gray',
    width: 330,
    marginBottom: 32,
  },

  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },

  utilSecondary: {
    flexGrow: 1,
    marginRight: 16,
  },

  utilPrimary: {
    flexGrow: 3,
  },

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

  selectGenderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },

  genderOption: {
    minWidth: '45%',
  },

  photoPickContainer: {
    marginTop: 32,
  },

  photoPickBtnsContainer: {
    width: 360,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  photoPreview: {
    width: 240,
    height: 240,
    borderRadius: 120,
    marginBottom: 16,
  },

  activePhotoContainer: {
    alignItems: 'center',
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

  passwordFieldContainer: {
    width: 300,
    marginBottom: 16,
  },

  fieldTitle: {
    marginBottom: 8,
    color: '$gray',
  },

  fieldcheckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  fieldcheckDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },

  fieldcheckText: {
    fontFamily: 'Roboto-Regular',
    fontSize: '$bcMedium',
  },

  passwordChecksContainer: {
    marginTop: 16,
  },

  stepDotsContainer: {
    width: 140,
    flexDirection: 'row',
    paddingVertical: 4,
    justifyContent: 'space-between',
  },

  stepDot: {
    width: 12,
    height: 12,
    backgroundColor: '$gray',
    borderRadius: 6,
  },

  stepDotActive: {
    backgroundColor: '$primary',
  },

  stepDotChecked: {
    backgroundColor: '$secondary',
  },

  checkTextField: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkTextFieldTitle: {
    fontFamily: 'Roboto-Medium',
    width: 70,
  },

  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  reviewLinkContainer: {
    margin: 0,
    padding: 0,
    paddingVertical: 0,
  },

  emailModalFieldButton: {
    marginTop: 32,
  },
});
