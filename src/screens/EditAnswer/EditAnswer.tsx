import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Container from '../../components/Container';
import DismissKeyboard from '../../components/DismissKeyboard';
import styles from './EditAnswer.styles';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import PrimaryButton from '../../components/Buttons';
import colors from '../../utils/colors';
import {
  DELETE_LINE_MUTATION,
  EditAnswerResponse,
  UPDATE_OR_CREATE_LINE_MUTATION,
} from './EditAnswer.graphql';
import {useMutation} from '@apollo/client';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PROFILE} from '../../components/Navigation/ProfileNavigator';
import errorCatcher, {showInfoToast} from '../../utils/toasts';
import GET_LINES_QUERY from '../../components/Lines/Lines.graphql';
import {BodyCopy} from '../../components/Typography';
import Header from '../../components/Header';

const MIN_ANSWER_LENGTH = 2;
const MAX_ANSWER_LENGTH = 250;

const validationSchema = yup.object({
  answer: yup.string().required().min(MIN_ANSWER_LENGTH).max(MAX_ANSWER_LENGTH),
});

const getInitialValues = (text: string = '') => ({
  answer: text,
});

const getLengthStatus = (length: number) => {
  if (length < MIN_ANSWER_LENGTH) {
    return 'incorrectLength';
  }

  if (length > MAX_ANSWER_LENGTH) {
    return 'incorrectLength';
  }

  return 'correctLength';
};

const AnswerInput = (props: TextInputProps) => {
  const {t} = useTranslation();
  const length = props.value?.length;
  return (
    <>
      <BodyCopy
        style={[styles.lengthCounter, styles[getLengthStatus(length || 0)]]}>
        {String(length || '')}
      </BodyCopy>
      <TextInput
        style={styles.input}
        placeholder={t('app.questions.answerPlaceholder')}
        value={props.value}
        autoFocus
        selectionColor={colors.darkGray}
        multiline={true}
        onChangeText={props.onChangeText}
      />
    </>
  );
};

const IDLE = 'IDLE';
const LOADING = 'LOADING';
const ERROR = ' ERROR';

type ScreenState = typeof IDLE | typeof LOADING | typeof ERROR;

export default () => {
  const [route, navigation] = [useRoute(), useNavigation()];
  const [screenState, setScreenState] = useState<ScreenState>(IDLE);

  const initialValues = getInitialValues(route.params?.answer);

  const shouldRenderRightButton = initialValues.answer.length > 0;

  const [submitForm] = useMutation<{
    updateOrCreateLine: EditAnswerResponse;
  }>(UPDATE_OR_CREATE_LINE_MUTATION, {
    refetchQueries: [GET_LINES_QUERY],
    onError: () => setScreenState(ERROR),
  });

  const [deleteLine] = useMutation<{deleteLine: EditAnswerResponse}>(
    DELETE_LINE_MUTATION,
    {onError: () => setScreenState(ERROR), refetchQueries: [GET_LINES_QUERY]},
  );

  const handleDeleteLine = async () => {
    setScreenState(LOADING);
    const questionId = route.params.questionId;
    if (questionId) {
      try {
        const {error} = await deleteLine({
          variables: {questionId},
        }).then(res => res.data?.deleteLine);

        if (error) {
          throw error;
        }

        setScreenState(IDLE);
        showInfoToast('Success!', 'Your profile has been updated!');
        // @ts-ignore
        navigation.navigate(PROFILE);
      } catch (e) {
        errorCatcher(e);
        setScreenState(ERROR);
      }
    }
  };

  const onDeleteLine = () => {
    Alert.alert(
      'Confirm Deletion',
      'Do you really want to delete this answer?',
      [
        {text: 'Cancel', style: 'cancel', onPress: () => null},
        {text: 'Delete', style: 'destructive', onPress: handleDeleteLine},
      ],
    );
  };

  const onSubmitForm = async (values: {answer: string}) => {
    setScreenState(LOADING);
    // @ts-ignore
    const questionId = route.params.questionId;
    if (questionId) {
      try {
        const {error} = await submitForm({
          variables: {answerText: values.answer, questionId},
        }).then(res => res.data?.updateOrCreateLine);

        if (error) {
          throw error;
        }

        setScreenState(IDLE);
        showInfoToast('Success!', 'Your profile has been updated!');
        // @ts-ignore
        navigation.navigate(PROFILE);
      } catch (e) {
        errorCatcher(e);
        setScreenState(ERROR);
      }
    }

    setScreenState(ERROR);
  };
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView behavior="height" style={styles.inputContainer}>
        <Header
          navigation={navigation}
          route={route}
          options={{
            // @ts-ignore
            title: route.params.title,
            // @ts-ignore
            headerBackTitle: route.params.headerBackTitle,
            ...(shouldRenderRightButton && {
              rightButtonTitle: 'Delete answer',
              onPressRightButton: onDeleteLine,
            }),
          }}
          back={{title: 'ass'}}
        />
        <Container style={styles.paddingContainer}>
          <Formik
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}>
            {({isValid, values, handleChange, submitForm}) => (
              <View style={styles.formContainer}>
                <AnswerInput
                  value={values.answer}
                  onChangeText={handleChange('answer')}
                />
                {isValid && (
                  <PrimaryButton
                    style={styles.submitButton}
                    title="Save Answer"
                    onPress={submitForm}
                    loading={screenState === LOADING}
                  />
                )}
              </View>
            )}
          </Formik>
        </Container>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};
