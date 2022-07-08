import React from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import Container from '../../components/Container';
import DismissKeyboard from '../../components/DismissKeyboard';
import styles from './EditAnswer.styles';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import PrimaryButton from '../../components/Buttons';
import colors from '../../utils/colors';

const MIN_ANSWER_LENGTH = 2;
const MAX_ANSWER_LENGTH = 250;

const validationSchema = yup.object({
  answer: yup.string().required().min(MIN_ANSWER_LENGTH).max(MAX_ANSWER_LENGTH),
});

const getInitialValues = (text = '') => ({
  answer: text,
});

const AnswerInput = (props: TextInputProps) => {
  const {t} = useTranslation();
  return (
    <TextInput
      style={styles.input}
      placeholder={t('app.questions.answerPlaceholder')}
      autoFocus
      selectionColor={colors.darkGray}
      multiline={true}
      onChangeText={props.onChangeText}
    />
  );
};

export default () => {
  const initialValues = getInitialValues();
  return (
    <DismissKeyboard>
      <View style={styles.inputContainer}>
        <Container style={styles.paddingContainer}>
          <Formik
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={validationSchema}
            onSubmit={values => console.warn(values.answer)}>
            {({isValid, values, handleChange}) => (
              <View style={styles.formContainer}>
                <AnswerInput
                  value={values.answer}
                  onChangeText={handleChange('answer')}
                />
                {isValid && (
                  <PrimaryButton
                    style={styles.submitButton}
                    title="Save Answer"
                  />
                )}
              </View>
            )}
          </Formik>
        </Container>
      </View>
    </DismissKeyboard>
  );
};
