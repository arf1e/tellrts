import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
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
});
