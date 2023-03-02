import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  scrollView: {
    paddingTop: 16,
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },

  pager: {
    flex: 1,
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

  noResultContainer: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
  },

  noResultContent: {
    width: 300,
    alignItems: 'center',
    marginTop: 100,
  },

  noResultTitle: {
    color: '$darkGray',
    fontSize: '$bcLarge',
    lineHeight: '$h3',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginBottom: 8,
  },

  noResultImage: {
    width: 200,
    height: 200,
    opacity: 0.8,
    marginBottom: 12,
  },

  noResultDescription: {
    fontSize: '$bcMedium',
    lineHeight: '$h4',
    color: '$gray',
    textAlign: 'center',
  },

  noResultButton: {
    width: 300,
    marginTop: 16,
  },

  tip: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 20,
  },

  tipText: {
    color: '$gray',
    marginTop: 12,
  },
});
