import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  cardContainer: {
    width: 160,
    minHeight: 228,
    borderRadius: 4,
    marginVertical: 20,
    backgroundColor: '$background',
    shadowColor: '$darkGray',
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  userPhotoImageContainer: {
    width: 160,
    height: 228,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'flex-end',
  },

  impressionIcon: {
    width: 24,
    height: 24,
  },

  impressionsPreviewContainer: {
    flexDirection: 'column-reverse',
  },

  impressionsPreview: {
    flexDirection: 'row',
  },

  requestInfoContainer: {
    alignSelf: 'center',
    backgroundColor: '$background',
    flexDirection: 'row',
    height: 34,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  requestInfoLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  requestDetailsScore: {
    marginLeft: 4,
    color: '$primary',
  },

  requestInfoLineImpressions: {
    marginLeft: 12,
  },

  hiddenImpressionsTip: {
    color: '$primary',
    marginLeft: 4,
  },

  requestGuessesIcon: {
    marginTop: 3,
  },
});
