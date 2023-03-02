import React from 'react';
import PrimaryButton from '../../components/Buttons';
import styles from './IncomingRequests.styles';

const AcceptIncomingRequestBtn = ({onPress}: {onPress: () => void}) => {
  return (
    <PrimaryButton
      icon="check"
      title="Accept"
      style={styles.acceptBtn}
      onPress={onPress}
    />
  );
};

export default AcceptIncomingRequestBtn;
