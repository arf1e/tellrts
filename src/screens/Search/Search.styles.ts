import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  scrollView: {
    paddingTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '$background',
  },

  userCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  userCardContainer: {
    width: 162,
    height: 162,
    backgroundColor: '$background',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  userCardImage: {
    width: 160,
    height: 160,
    borderRadius: 5,
  },

  activeUserModalPhoto: {
    width: 270,
    height: 270,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 32,
  },

  activeUserModalContainer: {
    flexGrow: 1,
  },

  activeUserModalContent: {
    flexGrow: 1,
    marginBottom: 'auto',
  },

  activeUserModalBioTitle: {
    color: '$darkGray',
    fontSize: '$bcBig',
    fontFamily: 'Roboto-Medium',
    marginBottom: 16,
  },

  activeUserModalBio: {
    marginBottom: 32,
    fontSize: '$bcBig',
    color: '$gray',
  },

  activeUserModalControls: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  activeUserModalCancelButton: {
    flex: 1,
  },

  activeUserModalPrimaryButton: {
    flex: 2,
    marginLeft: 32,
  },

  activeUserModalBioContainer: {},
});
