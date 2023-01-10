import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import PrimaryButton, {SecondaryButton} from '../../components/Buttons';
import Container from '../../components/Container';
import {BodyCopy} from '../../components/Typography';
import styles from './AttachInstagram.styles';
import Reanimated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useMutation} from '@apollo/client';
import {
  CONNECT_MY_INSTAGRAM_PROFILE_MUTATION,
  CONNECT_MY_INSTAGRAM_PROFILE_RESPONSE,
} from './AttachInstagram.graphql';
import errorCatcher, {
  showErrorToast,
  showSuccessToast,
} from '../../utils/toasts';
import {CHECK_IF_I_HAVE_INSTAGRAM_QUERY} from '../Socials/Socials.graphql';

const AnimatedView = Reanimated.createAnimatedComponent(View);

type Props = {
  id: string;
  username: string;
};

const ConfirmInstagramAttachment = ({id, username}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const onConnectInstagramMutationCompleted = (
    data: CONNECT_MY_INSTAGRAM_PROFILE_RESPONSE,
  ) => {
    if (!data.connectMyInstagramProfile.ok) {
      showErrorToast(
        'Не удалось связать профиль Instagram с этим аккаунтом.',
        data?.connectMyInstagramProfile?.error,
      );
      return;
    }

    showSuccessToast(
      `Instagram-аккаунт @${username} успешно привязан к профилю.`,
      'Изменения уже доступны в вашем профиле.',
    );
    navigation.goBack();
  };
  const [connectInstagram, {loading: connectMyInstagramProfileLoading}] =
    useMutation<CONNECT_MY_INSTAGRAM_PROFILE_RESPONSE, {id: string}>(
      CONNECT_MY_INSTAGRAM_PROFILE_MUTATION,
      {
        variables: {id},
        onCompleted: onConnectInstagramMutationCompleted,
        onError: error => errorCatcher(error),
        refetchQueries: [CHECK_IF_I_HAVE_INSTAGRAM_QUERY],
      },
    );

  return (
    <AnimatedView
      entering={FadeInUp.duration(210)}
      exiting={FadeOutUp.duration(140)}
      style={styles.confirmAttachmentContainer}>
      <Container>
        <View>
          <Text style={styles.confirmAttachmentTitle}>
            {t('app.settings.socialLinks.connectInstagramTitleBeforeUsername')}
            <Text
              style={
                styles.confirmAttachmentInstagram
              }>{`@${username}`}</Text>{' '}
            {t('app.settings.socialLinks.connectInstagramTitleAfterUsername')}
          </Text>

          <BodyCopy style={styles.confirmAttachmentDescription}>
            {t('app.settings.socialLinks.connectInstagramDescription')}
          </BodyCopy>

          <View style={styles.confirmAttachmentControls}>
            <SecondaryButton
              title={t('app.settings.socialLinks.connectInstagramCancel')}
              onPress={() => navigation.goBack()}
              style={styles.confirmAttachmentCancel}
            />
            <PrimaryButton
              title={t('app.settings.socialLinks.connectInstagramConfirm')}
              onPress={() => connectInstagram()}
              style={styles.confirmAttachmentProceed}
              loading={connectMyInstagramProfileLoading}
            />
          </View>
        </View>
      </Container>
    </AnimatedView>
  );
};

export default ConfirmInstagramAttachment;
