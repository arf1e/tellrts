import * as yup from 'yup';

export type Photo = {
  cropRect?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  height: number;
  modificationDate?: string;
  mime?: string;
  path: string;
  size?: number;
  width: number;
};

const validationSchema = yup.object().shape({
  photo: yup
    .object()
    .shape({
      cropRect: yup.object().shape({
        height: yup.number(),
        width: yup.number(),
        x: yup.number(),
        y: yup.number(),
      }),
      height: yup.number().required(),
      modificationDate: yup.string().nullable(), // ios
      mime: yup.string(),
      path: yup.string().required(),
      size: yup.number(),
      width: yup.number().required(),
    })
    .required(),
});

export default validationSchema;
