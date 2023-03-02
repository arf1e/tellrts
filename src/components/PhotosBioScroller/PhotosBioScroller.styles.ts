import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
import {AVATAR_HEIGHT} from '../../utils/photos';

const DEVICE_WIDTH = Dimensions.get('screen').width;

const ELEMENT_HEIGHT = AVATAR_HEIGHT;

export default EStyleSheet.create({
  mainContainer: {
    width: '100%',
    height: AVATAR_HEIGHT,
    backgroundColor: '$background',
  },

  picture: {
    width: DEVICE_WIDTH,
    height: ELEMENT_HEIGHT,
    position: 'absolute',
    zIndex: 1,
  },

  slide: {
    backgroundColor: '$background',
    width: DEVICE_WIDTH,
    flex: 1,
    zIndex: 4,
  },

  descriptionSlide: {
    backgroundColor: '$background',
    width: DEVICE_WIDTH,
    paddingVertical: 48,
  },

  descriptionContainer: {
    marginHorizontal: 24,
    backgroundColor: '$background',
    padding: 16,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '$secondary',
    borderRadius: 4,
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
