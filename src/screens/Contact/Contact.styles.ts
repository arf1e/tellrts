import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SCROLLABLE_PADDING_BOTTOM} from '../../utils/animationConstants';
import {AVATAR_HEIGHT} from '../../utils/photos';

const DEVICE_WIDTH = Dimensions.get('screen').width;

export default EStyleSheet.create({
  screenContainer: {
    backgroundColor: '$background',
  },

  scrollableContainer: {
    paddingBottom: SCROLLABLE_PADDING_BOTTOM,
  },

  photoContainer: {
    marginBottom: 26,
    zIndex: 0,
  },

  infoContainer: {
    paddingTop: 6,
    zIndex: 2,
    backgroundColor: '$background',
  },

  headerContainer: {
    height: AVATAR_HEIGHT,
    position: 'relative',
    paddingTop: 44,
    paddingHorizontal: 24,
    marginBottom: 32,
  },

  contactGoBack: {
    backgroundColor: '$background',
  },

  chatButton: {
    position: 'absolute',
    right: 0,
    bottom: -26,
    zIndex: 5,
  },

  contactHeaderInfo: {
    marginTop: 'auto',
    marginBottom: 16,
  },

  contactHeaderName: {
    color: '$background',
    fontSize: '$h3',
    marginBottom: 4,
    fontFamily: 'Roboto-Medium',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },

  contactHeaderCity: {
    color: '$background',
    fontSize: '$bcLarge',
    textShadowColor: '$darkGray',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },

  profileSectionTitle: {
    fontSize: '$h4',
    color: '$darkGray',
    marginBottom: 12,
  },

  profileDescription: {
    marginBottom: 24,
    marginTop: 0,
    color: '$gray',
    fontSize: '$bcMedium',
  },

  anketSwitchActive: {
    fontSize: '$h3',
    color: '$black',
    fontFamily: 'Roboto-Medium',
  },

  anketSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  contactCardContainer: {
    minWidth: 155,
    minHeight: 196,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: '$secondary',
    borderRadius: 4,
    marginRight: 16,
  },

  cardsContainer: {
    paddingTop: 20,
    marginBottom: 16,
    paddingHorizontal: 24,
  },

  contactCardTitle: {
    fontSize: '$bcBig',
    fontFamily: 'Roboto-Medium',
    color: '$darkGray',
    width: 112,
    alignSelf: 'flex-start',
  },

  contactCardContent: {
    marginTop: 'auto',
  },

  successRate: {
    fontSize: 44,
    fontFamily: 'Roboto-Medium',
  },

  impressionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 130,
  },

  impressionEmoji: {
    width: 32,
    height: 32,
    marginRight: 4,
    marginBottom: 4,
    opacity: 0.85,
  },

  takeTitle: {
    fontSize: '$bcSmall',
    fontFamily: 'Roboto-Medium',
    color: '$gray',
    marginBottom: 4,
  },

  takeAnswer: {
    fontSize: '$bcMedium',
  },

  takeAnswerCorrect: {
    color: '$good',
  },

  takeAnswerIncorrect: {
    color: '$bad',
  },

  anketsContainer: {
    zIndex: 2,
    backgroundColor: '$background',
  },

  contactHeaderPlaceholder: {
    width: DEVICE_WIDTH,
    height: AVATAR_HEIGHT,
    backgroundColor: '$secondary',
    marginBottom: 32,
    position: 'relative',
    padding: 24,
    paddingTop: 48,
  },
});
