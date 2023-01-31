export type REGISTER_FORM_VALUES = {
  name: string;
  email: string | any;
  birthday: Date | null;
  birthdayInput: string;
  sex: boolean | null;
  photo: any;
  countryCode: string | null;
  countryTitle: string;
  cityId: string;
  cityTitle: string;
  password: string;
  passwordConfirm: string;
};

export type REGISTER_FORM_TEST_VALUES = {
  name?: string;
  email?: string | any;
  birthday?: Date | null;
  birthdayInput?: string;
  sex?: boolean | null;
  photo?: any;
  countryCode?: string | null;
  countryTitle?: string;
  cityId?: string;
  cityTitle?: string;
  password?: string;
  passwordConfirm?: string;
};
