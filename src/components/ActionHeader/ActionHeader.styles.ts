import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  actionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: '$h4',
    fontFamily: 'Roboto-Medium',
    color: '$black',
  },

  sectionLink: {
    fontSize: '$bcMedium',
    fontFamily: 'Roboto-Regular',
  },
});
