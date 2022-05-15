import StyleSheet from 'react-native-extended-stylesheet';

export default StyleSheet.create({
  skeleton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },

  btnText: {
    fontFamily: 'Roboto-Medium',
    color: '$background',
  },

  primary: {
    backgroundColor: '$primary',
  },

  disabled: {
    opacity: 0.5,
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
