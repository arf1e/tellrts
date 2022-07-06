import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  scrollView: {
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '$background',
  },

  categoryContainer: {
    width: 160,
    marginBottom: 16,
  },

  categoryImage: {
    width: 165,
    height: 120,
    bottom: -10,
  },

  categoryContent: {
    backgroundColor: '$background',
    padding: 8,
    paddingTop: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: '$darkGray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  categoryTitle: {
    padding: 4,
    backgroundColor: '$darkGray',
    left: -4,
    top: -15,
    fontFamily: 'Roboto-Medium',
    color: '$background',
    fontSize: '$bcBig',
  },

  categoryDescription: {
    fontSize: '$bcSmall',
    lineHeight: '$bcBig',
    color: '$darkGray',
  },
});
