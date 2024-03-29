import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '$background',
  },

  screenScroll: {
    flexGrow: 1,
    paddingVertical: 32,
  },

  resultCardContainer: {
    marginHorizontal: 24,
    paddingVertical: 48,
    paddingHorizontal: 16,
    backgroundColor: '$background',
    borderRadius: 8,
    shadowColor: '$darkGray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginTop: '30%',
    elevation: 2,
  },

  resultCardHeading: {
    color: '$darkGray',
    marginBottom: 12,
    fontSize: '$h3',
  },

  resultDisplay: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginBottom: 16,
  },

  totalAnswers: {
    fontSize: '$bcLarge',
    lineHeight: '$h3',
    color: '$black',
  },

  correctAnswers: {
    fontSize: 84,
    lineHeight: 104,
    fontFamily: 'Roboto-Bold',
    color: '$good',
  },

  resultCardContent: {
    fontSize: '$bcMedium',
    lineHeight: 20,
    color: '$darkGray',
  },

  resultCardControls: {
    marginTop: 24,
  },

  resultCardPrimaryBtn: {
    marginBottom: 12,
  },

  anketReviewContainer: {
    paddingVertical: 32,
  },

  profileInfoPhoto: {
    width: 240,
    height: 240,
    borderRadius: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },

  reviewSectionContainer: {
    marginVertical: 8,
  },

  reviewSectionTitle: {
    color: '$darkGray',
    fontFamily: 'Roboto-Medium',
    fontSize: '$bcLarge',
    lineHeight: '$h3',
  },

  guessContainer: {
    borderWidth: 0.5,
    borderColor: '$secondary',
    backgroundColor: '$background',
    padding: 12,
    marginVertical: 16,
    minHeight: 90,
    marginRight: 16,
    borderRadius: 4,
    width: 272,
  },

  guessQuestion: {
    color: '$darkGray',
    fontSize: '$bcBig',
    fontFamily: 'Roboto-Medium',
    lineHeight: 20,
    marginBottom: 12,
  },

  guessAnswer: {
    fontSize: '$bcMedium',
    lineHeight: 20,
    marginTop: 12,
  },

  approvedAnswer: {
    fontSize: '$bcSmall',
    marginTop: 2,
    color: '$lightGray',
  },

  guessAnswerGood: {
    color: '$good',
  },

  guessAnswerBad: {
    color: '$bad',
  },

  profilingCardContainer: {
    borderColor: '$light',
    borderWidth: 0.5,
    backgroundColor: '$background',
    padding: 12,
    paddingTop: 20,
    marginVertical: 16,
    marginHorizontal: 10,
    borderRadius: 4,
    minWidth: 80,
  },

  resultTipContainer: {
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
    paddingTop: 20,
    marginVertical: 16,
    borderRadius: 4,
  },

  resultTipText: {
    color: '$gray',
    fontSize: '$bcMedium',
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

  guessCorrectAnswerTitle: {
    marginTop: 24,
    color: '$gray',
    fontSize: '$bcMedium',
    marginBottom: 12,
  },

  correctAnswer: {
    fontSize: '$bcMedium',
    lineHeight: '$bcLarge',
    color: '$black',
  },

  reviewSectionScroller: {
    paddingHorizontal: 24,
  },

  correctAnswerContainer: {
    paddingBottom: 4,
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(89, 197, 104, 0.7)',
    alignSelf: 'flex-start',
  },
});
