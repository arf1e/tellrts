import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  impressionCardContainer: {
    shadowColor: '$darkGray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: '$background',
    padding: 12,
    marginVertical: 16,
    marginHorizontal: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 94,
    height: 88,
  },

  impressionCardImage: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },

  impressionCardTitle: {
    fontSize: '$bcSmall',
    color: '$darkGray',
  },
});
