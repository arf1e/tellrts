import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable} from 'react-native';
import {BodyCopy} from '../Typography';
import styles from './Lines.styles';

const AddLine = ({onPress}: {onPress: () => void}) => {
  const {t} = useTranslation();

  return (
    <Pressable
      style={[styles.lineContainer, styles.addLineContainer]}
      onPress={onPress}>
      <BodyCopy style={styles.addLineContainerText}>
        {t('app.profile.addFirstLine')}
      </BodyCopy>
      <BodyCopy style={styles.addLineDescription}>
        {t('app.profile.addFirstLineDescription')}
      </BodyCopy>
    </Pressable>
  );
};

export default AddLine;
