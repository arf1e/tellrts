import * as yup from 'yup';
import YupPassword from 'yup-password';
import moment from 'moment';

// Add minUppercase && minNumbers support to yup
YupPassword(yup);

/* -----------------------
The only purpose i use this function instead of
default one is to let me view multiple errors at once
Exactly this one is used to make dynamic password checking @ Register screen.
----------------------- */

export const MIN_PWD_LENGTH = 8;
export const MAX_PWD_LENGTH = 32;

export const validateSchema = (schema: any) => (values: any) =>
  schema
    .validate(values, {
      abortEarly: false,
      strict: false,
    })
    .then(() => ({}))
    .catch(({inner}: any) =>
      inner.reduce(
        (memo: any, {path, message}: any) => ({
          ...memo,
          [path]: (memo[path] || []).concat(message),
        }),
        {},
      ),
    );

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('requiredd')
    .min(2)
    .max(12)
    .matches(/[а-яА-ЯЁёa-zA-Z]/),
  birthdayInput: yup.string().required().length(10),
  birthday: yup
    .date()
    .required('')
    .max(moment().subtract(16, 'years'), 'Слишком молод')
    .min(moment().subtract(100, 'years'), 'Слишком стар'),
  sex: yup.boolean().required(),
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
  countryCode: yup.string().required().length(2),
  countryTitle: yup.string().required().min(2),
  cityId: yup.string().required(),
  cityTitle: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(8, 'min-length')
    .minUppercase(1, 'uppercase')
    .minNumbers(1, 'numbers'),
  passwordConfirm: yup.string().required(),
  email: yup.string().email().required(),
});
