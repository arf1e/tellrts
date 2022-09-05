import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },

  content: {
    flex: 1,
    flexGrow: 1,
  },

  fullScreen: {
    flex: 1,
  },
});
