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
    paddingVertical: 20,
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
    fontSize: 144,
    lineHeight: 140,
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
    width: 78,
    height: 78,
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

  guessContainer: {
    shadowColor: '$darkGray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    alignContent: 'space-between',
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: '$background',
    padding: 12,
    marginVertical: 16,
    marginHorizontal: 10,
    borderRadius: 4,
    width: 272,
  },

  guessQuestion: {
    color: '$darkGray',
    fontSize: '$bcMedium',
    lineHeight: 20,
    marginBottom: 12,
  },

  guessAnswer: {
    fontSize: '$bcMedium',
    lineHeight: 20,
    marginTop: 'auto',
  },

  guessAnswerGood: {
    color: '$good',
  },

  guessAnswerBad: {
    color: '$bad',
  },

  profilingCardContainer: {
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
    marginHorizontal: 10,
    borderRadius: 4,
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
});
