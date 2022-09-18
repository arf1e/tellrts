import {useMutation} from '@apollo/client';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {Props} from 'react';
import {Alert} from 'react-native';
import Header from '../../components/Header';
import {DELETE_LINE_MUTATION, EditAnswerResponse} from './EditAnswer.graphql';
import GET_LINES_QUERY from '../../components/Lines/Lines.graphql';
import errorCatcher, {showInfoToast} from '../../utils/toasts';
import {PROFILE} from '../../components/Navigation/ProfileNavigator';
import {useTranslation} from 'react-i18next';
import {string} from 'yup/lib/locale';

type Props = {
  leftLinkTitle?: string;
};

const AnswerHeader = ({leftLinkTitle}: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {t} = useTranslation();
  // @ts-ignore
  const shouldRenderRightButton = route.params?.answer?.length > 0;

  const [deleteLine] = useMutation<{deleteLine: EditAnswerResponse}>(
    DELETE_LINE_MUTATION,
    {onError: () => console.warn('ass'), refetchQueries: [GET_LINES_QUERY]},
  );

  const handleDeleteLine = async () => {
    //@ts-ignore
    const questionId = route.params.questionId;
    if (questionId) {
      try {
        // @ts-ignore
        const {error} = await deleteLine({
          variables: {questionId},
        }).then(res => res.data?.deleteLine);

        if (error) {
          throw error;
        }
        showInfoToast('Success!', 'Your profile has been updated!');
        // @ts-ignore
        navigation.navigate(PROFILE);
      } catch (e) {
        errorCatcher(e);
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

  return (
    <Header
      //@ts-ignore
      navigation={navigation}
      route={route}
      options={{
        // @ts-ignore
        title: route.params.title,
        // @ts-ignore
        headerBackTitle: leftLinkTitle || route.params.headerBackTitle,
        ...(shouldRenderRightButton && {
          rightButtonTitle: t('app.questions.deleteAnswer'),
          onPressRightButton: onDeleteLine,
        }),
      }}
      back={{title: t('app.navigation.goBack')}}
    />
  );
};

export default AnswerHeader;
