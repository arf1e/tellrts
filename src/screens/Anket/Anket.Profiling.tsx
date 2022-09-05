import React from 'react';
import {useTranslation} from 'react-i18next';
import {Anket} from '../Search/Search.graphql';

import {checkIfFieldsHaveValues} from './Anket.utils';
import {ANKET_FORMIK_PROPS} from './AnketForm';
import AnketStep from './AnketStep';
import ProfileLine from './ProfileLine';

type Props = {
  formNavigation: any;
  anket: Anket;
  formikProps: ANKET_FORMIK_PROPS;
};

const Profiling = ({formNavigation, formikProps, anket}: Props) => {
  const {t} = useTranslation();

  return (
    <AnketStep
      navigation={formNavigation}
      heading={t('app.anket.profiling.title')}
      buttonDisabled={!checkIfFieldsHaveValues(formikProps.values.name)}
      description={t('app.anket.profiling.description')}>
      <ProfileLine
        question={t('app.anket.profiling.name.question')}
        answer={formikProps.values.name}
        options={anket.names}
        handleChoose={name => formikProps.setFieldValue('name', name)}
      />
    </AnketStep>
  );
};

export default Profiling;
