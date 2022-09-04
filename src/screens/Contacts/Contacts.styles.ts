import EStyleSheet from 'react-native-extended-stylesheet';

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
    marginBottom: 16,
  },

  userLineContainer: {
    paddingVertical: 4,
    marginBottom: 8,
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
});
