import StyleSheet from 'react-native-extended-stylesheet';

export default StyleSheet.create({
  skeleton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    zIndex: 0,
  },

  btnText: {
    fontFamily: 'Roboto-Medium',
    color: '$background',
  },

  primary: {
    backgroundColor: '$primary',
  },

  disabled: {
    opacity: 0.7,
  },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: '$primary',
  },

  secondaryBtnText: {
    color: '$primary',
    fontFamily: 'Roboto-Medium',
  },
});
