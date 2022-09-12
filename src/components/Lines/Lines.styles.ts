import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    marginTop: 32,
  },

  lineContainer: {
    flexDirection: 'column',
    width: 200,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '$secondary',
    borderRadius: 4,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 16,
  },

  lineQuestionText: {
    fontFamily: 'Roboto-Medium',
    fontSize: '$bcMedium',
    color: '$black',
    lineHeight: 20,
    marginBottom: 16,
  },

  lineAnswerText: {
    fontSize: '$bcMedium',
    lineHeight: 20,
    color: '$darkGray',
  },

  lineCategoryText: {
    color: '$black',
    fontFamily: 'Roboto-Regular',
    fontSize: '$bcSmall',
  },

  lineQuestionCategoryImage: {
    width: 42,
    height: 42,
    borderRadius: 2,
    marginRight: 12,
  },

  lineQuestionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
