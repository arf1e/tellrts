import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../utils/colors';

export default EStyleSheet.create({
  container: {
    flex: 1,
  },

  messagesScrollable: {
    flex: 1,
    backgroundColor: '$background',
  },

  messageContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: 300,
    flexShrink: 20,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  messagesList: {
    flexDirection: 'column',
    paddingHorizontal: 12,
    flexGrow: 1,
  },

  messageText: {
    color: '$background',
    fontSize: '$bcMedium',
  },

  myMessage: {
    backgroundColor: '$primary',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    shadowColor: '$primary',
  },

  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryReverse,
    borderBottomLeftRadius: 0,
    shadowColor: colors.primaryReverse,
  },

  chatInputContainer: {
    flexDirection: 'row',
    backgroundColor: '$background',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  chatInputField: {
    flex: 4,
  },

  chatInputButton: {
    flex: 1,
    justifyContent: 'center',
  },

  messageCreatedAt: {
    marginTop: 8,
    color: '$background',
    fontFamily: 'Roboto-Light',
    opacity: 0.6,
    fontSize: 10,
  },
});
