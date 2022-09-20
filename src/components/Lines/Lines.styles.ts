import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    marginTop: 32,
  },

  lineContainer: {
    flexDirection: 'column',
    width: 240,
    marginLeft: 24,
    borderWidth: 1,
    borderColor: '$primary',
    borderRadius: 4,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 16,
    marginHorizontal: 12,
  },

  addLineContainer: {
    borderColor: '$primary',
  },

  addLineContainerText: {
    color: '$primary',
    fontSize: '$h4',
    fontFamily: 'Roboto-Regular',
    marginBottom: 12,
  },

  addLineDescription: {
    color: '$darkGray',
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
    marginTop: 'auto',
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
