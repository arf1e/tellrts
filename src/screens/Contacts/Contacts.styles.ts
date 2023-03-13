import {Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SCROLLABLE_PADDING_BOTTOM} from '../../utils/animationConstants';

export default EStyleSheet.create({
  container: {
    flex: 1,
    ...(Platform.OS === 'android' && {paddingTop: 24}),
    backgroundColor: '$background',
  },

  usersListContainer: {
    flex: 1,
    flexGrow: 1,
    paddingBottom: SCROLLABLE_PADDING_BOTTOM,
  },

  listScrollable: {
    flexGrow: 1,
  },

  userLineContainer: {
    paddingVertical: 0,
    marginBottom: 8,
  },

  userLineContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userLinePhoto: {
    width: 52,
    height: 52,
    borderRadius: 32,
    marginRight: 16,
  },

  userLineName: {
    fontSize: '$bcLarge',
    color: '$darkGray',
    marginBottom: 4,
  },

  userLineCity: {
    fontSize: '$bcMedium',
    color: '$gray',
  },

  newContactsHeading: {
    color: '$black',
    fontSize: '$h4',
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
    marginTop: 20,
    flexGrow: 1,
  },

  screenHeader: {
    ...(Platform.OS === 'android' && {
      paddingBottom: 24,
    }),
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
    marginBottom: 4,
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
