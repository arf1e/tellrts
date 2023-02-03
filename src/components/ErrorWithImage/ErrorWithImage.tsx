import React from 'react';
import {View, Image} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import Reanimated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import styles from './ErrorWithImage.styles';
import PrimaryButton from '../Buttons';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

type Props = {
  title: string;
  description: string;
  btnTitle?: string;
  btnOnPress?: () => void;
};

const ErrorWithImage = ({title, description, btnTitle, btnOnPress}: Props) => {
  const shouldRenderBtn = btnTitle && btnOnPress;
  return (
    <ReanimatedView
      entering={FadeInDown.duration(240)}
      exiting={FadeOutDown.duration(240)}
      style={styles.noResultContainer}>
      <View style={styles.noResultContent}>
        <Image
          source={require('../../assets/error.png')}
          style={styles.noResultImage}
          resizeMode="contain"
        />
        <BodyCopy style={styles.noResultTitle}>{title}</BodyCopy>
        <BodyCopy style={styles.noResultDescription}>{description}</BodyCopy>
        {shouldRenderBtn && (
          <PrimaryButton
            title={btnTitle}
            style={styles.retryButton}
            onPress={btnOnPress}
          />
        )}
      </View>
    </ReanimatedView>
  );
};

export default ErrorWithImage;
