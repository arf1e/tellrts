import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Platform, View} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {SecondaryButton} from '../../components/Buttons';
import Field from '../../components/Field';
import Link from '../../components/Links';
import {MutationResponse, SEND_MESSAGE_MUTATION} from './Chat.graphql';
import styles from './Chat.styles';

type Props = {
  userId: number;
  chatRef: FlatList<any>;
};

const ChatInput = ({userId, chatRef}: Props) => {
  const [sendMessageToChat] = useMutation<
    MutationResponse,
    {userId: number; text: string}
  >(SEND_MESSAGE_MUTATION, {
    onCompleted: () => chatRef.scrollToEnd({animated: true}),
  });

  const initialValues = {
    userId,
    text: '',
  };

  const {t} = useTranslation();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        sendMessageToChat({variables: values});
        actions.resetForm();
      }}>
      {formikProps => (
        <>
          <View style={styles.chatInputContainer}>
            <Field
              style={styles.chatInputField}
              value={formikProps.values.text}
              onChangeText={formikProps.handleChange('text')}
              placeholder={t('app.chat.fieldPlaceholder')}
              autoCorrect={false}
            />
            <Link
              onPress={formikProps.submitForm}
              containerStyle={styles.chatInputButton}>
              Send
            </Link>
          </View>
          {Platform.OS === 'ios' && <KeyboardSpacer />}
        </>
      )}
    </Formik>
  );
};

export default ChatInput;
