import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const DEVICE_WIDTH = Dimensions.get('window').width;
const ELEMENT_HEIGHT = 300;

export default EStyleSheet.create({
  mainContainer: {
    width: '100%',
    height: ELEMENT_HEIGHT,
    backgroundColor: '$background',
  },

  picture: {
    width: DEVICE_WIDTH,
    height: ELEMENT_HEIGHT,
  },

  slide1: {
    backgroundColor: '$background',
    width: DEVICE_WIDTH,
    flex: 1,
  },

  descriptionSlide: {
    backgroundColor: '$primary',
    width: DEVICE_WIDTH,
    paddingVertical: 48,
  },

  descriptionContainer: {
    marginHorizontal: 24,
    backgroundColor: '$background',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderRadius: 4,
    flexGrow: 1,
    shadowColor: '$darkGray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  descriptionTitle: {
    color: '$darkGray',
    marginBottom: 8,
    fontSize: '$bcLarge',
  },

  descriptionText: {
    color: '$gray',
    fontSize: '$bcMedium',
    lineHeight: '$h4',
  },

  sliderIndicatorContainer: {
    flexDirection: 'row',
    backgroundColor: '$background',
    position: 'absolute',
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 16,
  },

  sliderIconContainer: {
    marginRight: 4,
    marginLeft: 4,
  },
});
