import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {BackHandler} from 'react-native';
import {toggleArrayElement} from '../../utils/arrays';
import {ANKET_FORMIK_PROPS} from './AnketForm';
import AnketStep from './AnketStep';
import ImpressionPicker from './Impression';

type Props = {
  setNextStep: () => void;
  handleQuitForm: () => void;
  sex: 'male' | 'female';
  formikProps: ANKET_FORMIK_PROPS;
};

const Impressions = ({
  setNextStep,
  handleQuitForm,
  sex,
  formikProps,
}: Props) => {
  const {t} = useTranslation();
  return (
    <AnketStep
      navigation={{
        setNextStep,
        setPreviousStep: handleQuitForm,
        previousStepTitle: t('app.anket.controls.quit'),
      }}
      buttonDisabled={formikProps.values.impressions.length < 1}
      heading={t('app.anket.impressions.title')}
      description={t('app.anket.impressions.description')}>
      <ImpressionPicker
        activeImpressions={formikProps.values.impressions}
        sex={sex}
        onPressImpression={impression =>
          formikProps.setFieldValue(
            'impressions',
            toggleArrayElement(formikProps.values.impressions, impression),
          )
        }
      />
    </AnketStep>
  );
};

export default Impressions;
