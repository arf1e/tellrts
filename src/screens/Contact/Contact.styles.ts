import EStyleSheet from 'react-native-extended-stylesheet';
import {AVATAR_HEIGHT} from '../../components/AnketHeader/AnketHeader.styles';

export default EStyleSheet.create({
  screenContainer: {
    backgroundColor: '$background',
  },
  headerContainer: {
    height: AVATAR_HEIGHT,
    position: 'relative',
    paddingTop: 44,
    paddingHorizontal: 24,
    marginBottom: 26,
  },

  contactGoBack: {
    backgroundColor: '$background',
  },

  chatButton: {
    position: 'absolute',
    right: 24,
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
    textShadowColor: '$darkGray',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
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
    color: '$gray',
    fontSize: '$bcMedium',
    lineHeight: 20,
  },
});
