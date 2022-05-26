import {ReactNativeFile} from 'apollo-upload-client';
export const generateRNFile = (image: any) => {
  return image
    ? new ReactNativeFile({
        uri: image.path,
        type: image.mime,
        name: Date.now().toString(),
      })
    : null;
};
