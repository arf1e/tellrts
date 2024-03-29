import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SCROLLABLE_PADDING_BOTTOM} from '../../utils/animationConstants';

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  scrollable: {
    flexGrow: 1,
    paddingBottom: SCROLLABLE_PADDING_BOTTOM,
  },
  anketElementsContainer: {
    flex: 1,
  },
  anketMainContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '$background',
    position: 'relative',
  },

  stepTitle: {
    fontSize: '$h3',
    lineHeight: '$h3',
    marginBottom: 12,
    color: '$darkGray',
  },

  stepDescription: {
    fontSize: '$bcMedium',
    color: '$gray',
    lineHeight: '$h4',
  },

  stepInfo: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  stepDescriptionButton: {
    marginLeft: 16,
    opacity: 0.8,
  },

  impressionPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  impressionOptionContainer: {
    width: 95,
    padding: 8,
    paddingBottom: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    borderColor: '$secondary',
  },

  impressionOptionImage: {
    width: 24,
    height: 24,
    marginBottom: 8,
    marginLeft: -2,
  },

  impressionOptionTitle: {
    fontSize: '$bcSmall',
    color: '$gray',
  },

  stepsContainer: {
    position: 'relative',
    flex: 1,
  },

  stepContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 8,
    backgroundColor: '$background',
    shadowColor: '$darkGray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 32,
    marginHorizontal: 24,
    width: Dimensions.get('screen').width - 48,
  },

  stepControls: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stepPreviousButton: {
    flex: 2,
  },

  stepNextButton: {
    flex: 3,
    marginLeft: 20,
  },

  anketProgressBackground: {
    height: 4,
    width: Dimensions.get('screen').width,
    backgroundColor: '$secondary',
  },

  anketProgressLine: {
    height: 4,
    backgroundColor: '$primary',
  },

  lineQuestion: {
    fontSize: '$bcBig',
    color: '$black',
  },

  profileLineHeadingContainer: {
    marginBottom: 6,
  },

  profileLineContentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  anketLineHeading: {
    marginBottom: 6,
  },

  anketLineContainer: {
    marginBottom: 20,
  },

  answerOptionContainer: {
    padding: 12,
    maxHeight: 150,
    maxWidth: 250,
    borderColor: '$secondary',
    borderWidth: 1,
    marginRight: 12,
    marginVertical: 6,
    borderRadius: 4,
  },

  answerOptionText: {
    fontSize: '$bcSmall',
    lineHeight: 18,
  },

  anketLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
