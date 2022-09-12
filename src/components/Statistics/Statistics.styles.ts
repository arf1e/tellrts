import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    marginTop: 16,
  },

  cardContainer: {
    paddingTop: 28,
    paddingHorizontal: 12,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: '$secondary',
    borderRadius: 4,
    width: 164,
    marginBottom: 16,
  },

  cardInfo: {
    marginTop: 24,
    width: 120,
  },

  cardValue: {
    fontSize: '$h1',
    fontFamily: 'Roboto-Medium',
    lineHeight: '$h1',
    marginTop: 8,
    color: '$darkGray',
  },

  cardTitle: {
    fontSize: '$bcLarge',
    color: '$darkGray',
    fontFamily: 'Roboto-Medium',
    marginBottom: 12,
  },

  cardDescription: {
    fontSize: '$bcMedium',
    color: '$gray',
    lineHeight: 18,
  },

  cardsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
