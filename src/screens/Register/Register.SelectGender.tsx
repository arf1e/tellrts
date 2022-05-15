import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import OptionWithIcon from '../../components/Option/OptionWithIcon';

import styles from './Register.styles';

interface Props {
  sex: boolean | null;
  handleChange: (bool: boolean) => void;
}

export default ({sex, handleChange}: Props): React.ReactElement => {
  const {t} = useTranslation();
  return (
    <View style={styles.selectGenderContainer}>
      <OptionWithIcon
        containerStyle={styles.genderOption}
        title={t('register.sex.female')}
        icon={{title: 'female-sharp', size: 32}}
        isActive={sex === false}
        onPress={() => handleChange(false)}
      />
      <OptionWithIcon
        containerStyle={styles.genderOption}
        title={t('register.sex.male')}
        icon={{title: 'male-sharp', size: 32}}
        isActive={sex === true}
        onPress={() => handleChange(true)}
      />
    </View>
  );
};
