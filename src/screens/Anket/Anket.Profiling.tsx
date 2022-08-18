import React from 'react';
import {Anket} from '../Search/Search.graphql';

import {BRIEFING} from './Anket.types';
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
  return (
    <AnketStep
      navigation={formNavigation}
      heading="Профайлинг"
      buttonDisabled={!checkIfFieldsHaveValues(formikProps.values.name)}
      description={`Тут нет ничего общего с профайлингом. ${'\n'}Просто слово красивое.`}>
      <ProfileLine
        question="Тебя зовут"
        answer={formikProps.values.name}
        options={anket.names}
        handleChoose={name => formikProps.setFieldValue('name', name)}
      />
    </AnketStep>
  );
};

export default Profiling;
