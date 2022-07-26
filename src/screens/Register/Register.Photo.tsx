import React, {useState} from 'react';
import {View, Image, Pressable} from 'react-native';
import {BodyCopy} from '../../components/Typography';
import {FormikProps} from 'formik';
import styles from './Register.styles';
import OptionWithIcon from '../../components/Option/OptionWithIcon';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import {REGISTER_FORM_VALUES} from './Register.types';
import errorCatcher from '../../utils/toasts';
import {pickerOptions} from '../../utils/photos';

type Props = {
  formikProps: FormikProps<REGISTER_FORM_VALUES>;
};

const Photo = ({formikProps}: Props) => {
  const {t} = useTranslation();

  const [changePhotoActive, setChangePhotoActive] = useState(false);

  const processPhoto = (image: any) => {
    if (image.path) {
      if (image.mime) {
        const ext = image.mime.split('/')[1];
        if (['jpg', 'png', 'jpeg'].includes(ext)) {
          formikProps.setFieldValue('photo', image);
          setChangePhotoActive(false);
          return null;
        }
        throw new Error('wrong ext');
      }
    }
    throw new Error('process photo');
  };

  const handleChoosePhoto = () => {
    ImagePicker.openPicker(pickerOptions)
      .then(image => processPhoto(image))
      .catch(e => errorCatcher(e));
  };

  const handleTakePhoto = () => {
    ImagePicker.openCamera(pickerOptions).then(image => processPhoto(image));
  };

  const renderPhotoBtns = () => (
    <View style={styles.photoPickBtnsContainer}>
      <OptionWithIcon
        icon={{title: 'image', size: 32}}
        title={t('register.photo.gallery')}
        onPress={handleChoosePhoto}
      />
      <OptionWithIcon
        icon={{title: 'camera', size: 32}}
        title={t('register.photo.camera')}
        onPress={handleTakePhoto}
      />
    </View>
  );

  const noPhoto = !formikProps.values.photo;
  const photoPath = formikProps.values.photo.path;

  return (
    <View style={styles.photoPickContainer}>
      {noPhoto && renderPhotoBtns()}
      {!!photoPath && (
        <View style={styles.activePhotoContainer}>
          <Pressable
            disabled={changePhotoActive}
            onPress={() => setChangePhotoActive(true)}>
            <Image source={{uri: photoPath}} style={styles.photoPreview} />
          </Pressable>
          {changePhotoActive ? (
            renderPhotoBtns()
          ) : (
            <BodyCopy>{t('register.photo.changePhotoHint')}</BodyCopy>
          )}
        </View>
      )}
    </View>
  );
};

export default Photo;
