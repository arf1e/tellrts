import EStyleSheet, {hairlineWidth} from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$background',
  },

  usersListContainer: {
    flex: 1,
  },

  listScrollable: {
    flexGrow: 1,
  },

  screenHeader: {
    marginBottom: 24,
  },

  userLineContainer: {
    paddingVertical: 4,
    marginBottom: 8,
    zIndex: 200,
  },

  userLineContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userLinePhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },

  userLineName: {
    fontSize: '$bcLarge',
    color: '$darkGray',
    marginBottom: 8,
  },

  userLineCity: {
    fontSize: '$bcMedium',
    color: '$gray',
  },

  newContactsHeading: {
    color: '$black',
    fontSize: '$h4',
    marginBottom: 12,
  },

  newContactHolder: {
    width: 120,
    height: 120,
    backgroundColor: '$secondary',
    borderRadius: 4,
    marginHorizontal: 8,
    marginBottom: 8,
  },

  contactsSearchField: {
    marginVertical: 12,
    flexGrow: 1,
  },

  inputAndClearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  newContactContainer: {
    backgroundColor: '$background',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  newContactAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 12,
  },

  newContactName: {
    fontSize: '$bcSmall',
    marginBottom: 4,
  },

  newContactCity: {
    fontSize: 10,
  },
});
