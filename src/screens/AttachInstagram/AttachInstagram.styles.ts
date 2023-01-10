import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$background',
  },

  confirmAttachmentTitle: {
    fontSize: '$h4',
    color: '$darkGray',
    lineHeight: '$h3',
    marginBottom: 8,
  },

  confirmAttachmentDescription: {
    marginBottom: 16,
  },

  confirmAttachmentControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  confirmAttachmentInstagram: {
    color: '$primary',
  },
  confirmAttachmentCancel: {
    flex: 0.8,
    marginRight: 24,
  },

  confirmAttachmentProceed: {
    flex: 1,
  },
});
