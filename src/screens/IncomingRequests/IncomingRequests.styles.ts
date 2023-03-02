import EStyleSheet from 'react-native-extended-stylesheet';
import {SCROLLABLE_PADDING_BOTTOM} from '../../utils/animationConstants';

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '$background',
  },

  listContainer: {
    flexGrow: 1,
  },

  flatListContainer: {
    flexGrow: 1,
    paddingBottom: SCROLLABLE_PADDING_BOTTOM,
    alignItems: 'space-between',
  },

  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  activeRequestContainer: {
    flex: 1,
    backgroundColor: '$background',
  },

  activeRequestControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  activeRequestInfo: {
    marginTop: 16,
    flexDirection: 'row',
    marginBottom: 16,
  },

  activeRequestSection: {
    flex: 1,
    alignItems: 'center',
  },

  ignoreBtn: {
    flex: 3,
  },

  acceptBtn: {
    flex: 4,
    marginLeft: 20,
  },

  activeRequestLoading: {
    height: 40,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successRateValueText: {
    fontSize: '$bcBig',
    fontFamily: 'Roboto-Regular',
    fontWeight: '200',
    color: '$primary',
  },

  activeRequestSubtitle: {
    color: '$darkGray',
    fontSize: '$bcBig',
    fontFamily: 'Roboto-Medium',
    marginBottom: 12,
  },

  activeRequestSuccessRate: {
    flex: 2,
  },

  activeRequestImpressions: {
    flex: 3,
  },

  impressionBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    borderColor: '$primary',
    marginRight: 8,
    marginBottom: 8,
  },

  impressionBadgeImage: {
    width: 20,
    height: 20,
  },

  impressionBadgeText: {
    fontSize: '$bcSmall',
    color: '$gray',
    marginLeft: 8,
  },

  activeRequestBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeRequestBottomSheetContainer: {
    flex: 1,
    backgroundColor: '$background',
  },

  activeRequestControlsContainer: {
    marginBottom: 32,
  },
});
