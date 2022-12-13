import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screenContainer: {
    backgroundColor: '$background',
    flex: 1,
  },

  sectionContainer: {
    marginTop: 16,
  },

  sectionHeading: {
    marginBottom: 4,
    color: '$darkGray',
    fontSize: '$h4',
  },

  sectionDescription: {
    marginBottom: 8,
  },

  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
