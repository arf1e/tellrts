import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  btn: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
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
    color: '$darkGray',
    fontFamily: 'Roboto-Regular',
    fontSize: '$bcBig',
  },

  textActive: {
    color: '$black',
  },

  btnIconText: {
    marginLeft: 16,
  },
});