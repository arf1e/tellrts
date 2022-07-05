import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    marginTop: 32,
  },

  lineContainer: {
    flexDirection: 'column',
    elevation: 2,
    padding: 12,
    width: 150,
    borderRadius: 5,
    marginHorizontal: 8,
    shadowColor: '$darkGray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    backgroundColor: '$background',
    shadowRadius: 1.41,
  },

  lineQuestionText: {
    fontFamily: 'Roboto-Medium',
    fontSize: '$bcMedium',
    color: '$gray',
    lineHeight: '$bcLarge',
    marginBottom: 16,
  },

  lineCategoryText: {
    color: '$gray',
    fontSize: '$bcMedium',
  },

  linesContainer: {
    paddingVertical: 16,
  },

  lineQuestionCategoryImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  lineQuestionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});