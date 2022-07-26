import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '$background',
  },

  currentPhoto: {
    width: 260,
    height: 260,
    borderRadius: 130,
    alignSelf: 'center',
    marginBottom: 16,
  },

  controlsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
