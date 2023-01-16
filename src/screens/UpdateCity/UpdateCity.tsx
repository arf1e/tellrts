import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import styles from './UpdateCity.styles';
import {Formik} from 'formik';
import {useMutation, useQuery} from '@apollo/client';
import Reanimated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {
  GET_MY_LOCATION_QUERY,
  MyLocationQueryResult,
  UPDATE_CITY_MUTATION,
  UPDATE_CITY_MUTATION_DATA,
  UPDATE_CITY_MUTATION_VARIABLES,
} from './UpdateCity.graphql';
import {getCountryNameByCode} from '../../components/Modals/countries';
import Container from '../../components/Container';
import Location from '../Register/Register.Location';
import * as yup from 'yup';
import PrimaryButton from '../../components/Buttons';
import {useTranslation} from 'react-i18next';
import errorCatcher, {showSuccessToast} from '../../utils/toasts';
import {PROFILE_QUERY} from '../Profile/Profile.graphql';
import animationConstants from '../../utils/animationConstants';

const validationSchema = yup.object().shape({
  countryCode: yup.string().required(),
  cityId: yup.string().required(),
});

const AnimatedView = Reanimated.createAnimatedComponent(View);

const UpdateCity = () => {
  const {t, i18n} = useTranslation();
  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery<MyLocationQueryResult>(GET_MY_LOCATION_QUERY);
  const language = i18n.language;

  const onMutationCompleted = (data, reset) => {
    if (data.error) {
      errorCatcher(data.error, {
        title: t('app.settings.location.error.title'),
        message: t('app.settings.location.error.message'),
      });
      reset();
      return;
    }

    showSuccessToast(
      t('app.settings.location.success.title'),
      t('app.settings.location.success.message'),
    );
    reset();
    return;
  };

  const onMutationErrored = (error, reset) => {
    errorCatcher(error, {
      title: t('app.settings.location.error.title'),
      message: t('app.settings.location.error.message'),
    });
    reset();
  };

  const [updateCity, {loading: mutationLoading, reset}] = useMutation<
    UPDATE_CITY_MUTATION_DATA,
    UPDATE_CITY_MUTATION_VARIABLES
  >(UPDATE_CITY_MUTATION, {
    onCompleted: data => onMutationCompleted(data, reset),
    refetchQueries: [PROFILE_QUERY, GET_MY_LOCATION_QUERY],
    onError: error => onMutationErrored(error, reset),
    fetchPolicy: 'network-only',
  });

  const initialValues = {
    countryCode: queryData?.me.countryCode,
    countryTitle: getCountryNameByCode(queryData?.me.countryCode, language),
    countrySelected: queryData?.me.countryCode,
    cityId: queryData?.me.cityId,
    cityTitle: queryData?.me.cityTitle,
  };

  const handleSubmit = values => {
    updateCity({
      variables: {cityId: values.cityId, countryCode: values.countryCode},
    });
  };

  const maybeRenderPrimaryButton = formikProps => {
    const thereIsData =
      formikProps.values.cityId?.length > 0 &&
      formikProps.values.countryCode?.length > 0;
    const userHasChangedCity =
      formikProps.values.cityId !== queryData?.me.cityId;
    const shouldRenderPrimaryButton = thereIsData && userHasChangedCity;
    return (
      <>
        {shouldRenderPrimaryButton && (
          <AnimatedView entering={FadeIn} exiting={FadeOut}>
            <PrimaryButton
              title={t('app.settings.location.confirm')}
              style={styles.confirmButton}
              onPress={formikProps.handleSubmit}
              loading={mutationLoading}
            />
          </AnimatedView>
        )}
      </>
    );
  };

  return (
    <View style={styles.screenContainer}>
      {queryLoading && <ActivityIndicator />}
      {queryData && (
        <Container>
          <AnimatedView
            entering={FadeIn.duration(animationConstants.BUTTON_IN)}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}>
              {formikProps => (
                <>
                  <Location formikProps={formikProps} />
                  {maybeRenderPrimaryButton(formikProps)}
                </>
              )}
            </Formik>
          </AnimatedView>
        </Container>
      )}
    </View>
  );
};

export default UpdateCity;
