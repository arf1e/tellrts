import EStyleSheet from 'react-native-extended-stylesheet';
import {SCROLLABLE_PADDING_BOTTOM} from '../../utils/animationConstants';

export default EStyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '$background',
  },

  screenContentContainer: {
    paddingBottom: SCROLLABLE_PADDING_BOTTOM,
  },

  settingsSectionContainer: {
    marginBottom: 32,
  },

  settingsSectionLink: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingsSectionLinkText: {
    fontFamily: 'Roboto-Regular',
  },

  settingsSectionLinkTitle: {
    marginRight: 16,
  },

  settingsSectionSubtitle: {
    fontSize: 20,
    marginBottom: 16,
  },

  logoutLink: {
    marginTop: 32,
  },
});
