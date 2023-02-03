import EStyleSheet from 'react-native-extended-stylesheet';
import {SCROLLABLE_PADDING_BOTTOM} from '../../utils/animationConstants';

export default EStyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '$background',
    paddingVertical: 16,
  },

  questionsGrid: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: SCROLLABLE_PADDING_BOTTOM,
  },

  questionContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '$background',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '$secondary',
  },

  questionText: {
    fontSize: '$bcBig',
    fontFamily: 'Roboto-Regular',
    color: '$gray',
  },
});
