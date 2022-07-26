import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import OptionWithIcon from '../../components/Option/OptionWithIcon';
import {handleChoosePhoto, handleTakePhoto} from '../../utils/photos';
import errorCatcher from '../../utils/toasts';
import styles from './UpdatePhoto.styles';

type Props = {
  updatePhoto: (image: ImageOrVideo) => void;
};

const Controls = ({updatePhoto}: Props) => {
  const {t} = useTranslation();

  const processPhoto = async (image: ImageOrVideo) => {
    if (image.path) {
      if (image.mime) {
        const ext = image.mime.split('/')[1];
        if (['jpg', 'png', 'jpeg'].includes(ext)) {
          await updatePhoto(image);
          return null;
        }
        throw new Error('wrong ext');
      }
    }
    throw new Error('process photo');
  };

  return (
    <View style={styles.controlsContainer}>
      <OptionWithIcon
        icon={{title: 'image', size: 32}}
        title={t('register.photo.gallery')}
        onPress={() =>
          handleChoosePhoto(
            image => processPhoto(image),
            error => errorCatcher(error),
          )
        }
      />
      <OptionWithIcon
        icon={{title: 'camera', size: 32}}
        title={t('register.photo.camera')}
        onPress={() =>
          handleTakePhoto(
            image => processPhoto(image),
            error => errorCatcher(error),
          )
        }
      />
    </View>
  );
};

export default Controls;
