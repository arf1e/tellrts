import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput, View} from 'react-native';
import {FadeIn, FadeInDown, FadeOutDown} from 'react-native-reanimated';
import * as yup from 'yup';

import PrimaryButton from '../../components/Buttons';
import Container from '../../components/Container';
import {PROFILE} from '../../components/Navigation/ProfileNavigator';
import animationConstants from '../../utils/animationConstants';
import colors from '../../utils/colors';
import errorCatcher, {showInfoToast} from '../../utils/toasts';
import {PRIMARY_INFO_QUERY} from '../Profile/Profile.graphql';
import {UpdateBioResult, UPDATE_BIO_MUTATION} from './UpdateBio.graphql';
import styles from './UpdateBio.styles';

type Props = {
  bio: string;
};

const MIN_BIO_LENGTH = 10;
const MAX_BIO_LENGTH = 200;

const validationSchema = yup.object({
  bio: yup.string().required().min(MIN_BIO_LENGTH).max(MAX_BIO_LENGTH),
});

const InputBio = ({bio}: Props) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const onError = (error: string, reset: () => void) => {
    errorCatcher(error, {
      title: t('app.settings.bio.errorMessage.title'),
      message: t('app.settings.bio.errorMessage.body'),
    });
    reset();
  };

  const [mutateBio, {loading: mutateBioLoading, reset}] =
    useMutation<UpdateBioResult>(UPDATE_BIO_MUTATION, {
      onError: e => onError(e.message, reset),
      refetchQueries: [PRIMARY_INFO_QUERY],
      onCompleted: data => {
        const {error} = data.updateBio;
        if (error) {
          onError(error, reset);
        }
        showInfoToast(
          t('app.settings.bio.successMessage.title'),
          t('app.settings.bio.successMessage.body'),
        );
        // @ts-ignore
        navigation.navigate(PROFILE);
      },
    });

  const handleSubmit = async (values: {bio: string}) => {
    await mutateBio({variables: {bio: values.bio}});
  };
  return (
    <Container style={styles.paddingContainer}>
      <Formik
        initialValues={{bio}}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}>
        {({isValid, handleChange, values, submitForm}) => (
          <View style={styles.formContent}>
            <TextInput
              style={styles.input}
              placeholder={t('app.settings.bio.placeholder')}
              value={values.bio}
              autoFocus={true}
              autoCorrect={false}
              returnKeyType="done"
              selectionColor={colors.darkGray}
              maxLength={MAX_BIO_LENGTH}
              multiline={true}
              onChangeText={handleChange('bio')}
            />
            {isValid && (
              <PrimaryButton
                entering={FadeInDown.duration(animationConstants.BUTTON_IN)}
                exiting={FadeOutDown.duration(animationConstants.BUTTON_OUT)}
                onPress={submitForm}
                loading={mutateBioLoading}
                title={t('app.settings.bio.btnTitle')}
                style={styles.button}
              />
            )}
          </View>
        )}
      </Formik>
    </Container>
  );
};

export default InputBio;
