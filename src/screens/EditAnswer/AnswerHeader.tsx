import {useMutation} from '@apollo/client';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Alert} from 'react-native';
import Header from '../../components/Header';
import {DELETE_LINE_MUTATION, EditAnswerResponse} from './EditAnswer.graphql';
import GET_LINES_QUERY from '../../components/Lines/Lines.graphql';
import errorCatcher, {showInfoToast} from '../../utils/toasts';
import {PROFILE} from '../../components/Navigation/ProfileNavigator';

const AnswerHeader = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const shouldRenderRightButton = route.params?.answer?.length > 0;

  const [deleteLine] = useMutation<{deleteLine: EditAnswerResponse}>(
    DELETE_LINE_MUTATION,
    {onError: () => console.warn('ass'), refetchQueries: [GET_LINES_QUERY]},
  );

  const handleDeleteLine = async () => {
    const questionId = route.params.questionId;
    if (questionId) {
      try {
        const {error} = await deleteLine({
          variables: {questionId},
        }).then(res => res.data?.deleteLine);

        if (error) {
          throw error;
        }
        showInfoToast('Success!', 'Your profile has been updated!');
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
  );
};

export default AnswerHeader;
