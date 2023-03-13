import i18next from 'i18next';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

export const pickerOptions = {
  width: 800,
  height: 850,
  cropping: true,
  cropperToolbarColor: '#FDFFFF',
  cropperStatusBarColor: '#1693A5',
  cropperToolbarWidgetColor: '#1D2C2E',
  cropperActiveWidgetColor: '#1693A5',
  cropperCircleOverlay: false,
  cropperToolbarTitle: i18next.t('register.photo.editPhoto'),
};

export const handleChoosePhoto = (
  onSuccess: (image: ImageOrVideo) => void,
  onError: (e: Error) => void,
) => {
  ImagePicker.openPicker(pickerOptions)
    .then(image => onSuccess(image))
    .catch(e => onError(e));
};

export const handleTakePhoto = (
  onSuccess: (image: ImageOrVideo) => void,
  onError: (e: Error) => void,
) => {
  ImagePicker.openCamera(pickerOptions)
    .then(image => onSuccess(image))
    .catch(e => onError(e));
};

export const AVATAR_HEIGHT = 370;
export const ANKET_AVATAR_HEIGHT = 320;
