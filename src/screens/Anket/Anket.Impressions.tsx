import React from 'react';
import {toggleArrayElement} from '../../utils/arrays';
import {IMPRESSIONS} from './Anket.types';
import {ANKET_FORMIK_PROPS} from './AnketForm';
import AnketStep from './AnketStep';
import ImpressionPicker from './Impression';

type Props = {
  setNextStep: () => void;
  handleQuitForm: () => void;
  formikProps: ANKET_FORMIK_PROPS;
};

const Impressions = ({setNextStep, handleQuitForm, formikProps}: Props) => {
  return (
    <AnketStep
      navigation={{
        setNextStep,
        setPreviousStep: handleQuitForm,
        previousStepTitle: 'Выйти',
      }}
      buttonDisabled={formikProps.values.impressions.length < 1}
      heading="Первое впечатление"
      description={`Начнём с комплиментов! ${'\n'}Допустимы любые комбинации.`}>
      <ImpressionPicker
        activeImpressions={formikProps.values.impressions}
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
