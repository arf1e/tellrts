import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  btn: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '$secondary',
  },

  icon: {
    color: '$primary',
  },

  btnIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnActive: {
    borderColor: '$primary',
  },

  text: {
    color: '$gray',
    fontFamily: 'Roboto-Regular',
    fontSize: '$bcSmall',
  },

  textActive: {
    color: '$black',
  },

  btnIconText: {
    marginLeft: 16,
  },
});
