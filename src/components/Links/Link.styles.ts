import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  text: {
    fontSize: '$bcBig',
    fontFamily: 'Roboto-Medium',
    color: '$primary',
  },

  container: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrowRightAlignment: {
    flexDirection: 'row-reverse',
  },

  arrowForward: {
    marginLeft: 4,
  },

  arrowBack: {
    marginRight: 4,
  },
});
