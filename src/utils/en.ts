export default {
  login: {
    description: 'The dating app for introverts and weirdos',
    form: {
      title: 'Sign up / Sign in',
      emailFieldTitle: 'Email',
      emailPlaceholder: "We'll figure out if you are already registered",
      btnTitle: 'Proceed',
      signUpBtn: 'Sign Up',
      loginBtn: 'Sign In',
      passwordFieldTitle: 'Password',
    },
  },
  register: {
    name: {
      title: 'What is your name?',
      description:
        'Introduce yourself to us so we can match you up with others.',
      fieldTitle: 'My name is',
      fieldPlaceholder: 'Just like it is in passport',
    },
    birthday: {
      title: 'When is your cake day?',
      description: "Don't worry, we will only display your age.",
      fieldTitle: 'My birthday is',
      placeholder: 'DD-MM-YYYY',
      errors: {
        tooYoung: 'You should be at least 16 years old.',
        tooOld: 'Yeah, we get it. You are the funniest in the room.',
      },
    },
    sex: {
      title: 'Sex',
      description:
        "We're already getting threatened on Twitter for this question.",
      male: 'Gentleman',
      female: 'Lady',
    },
    photo: {
      title: 'Photo',
      description: "Yeah, that's kinda the point of this app.",
      gallery: 'Open gallery',
      camera: 'Take a picture',
      descriptionAttached:
        "Got it! You may continue if you're good with this pic.",
      changePhotoHint: 'Tap the picture to choose another one instead.',
      editPhoto: 'Edit Photo',
      errors: {
        photoEditError: 'There was an error processing photo.',
      },
    },
    location: {
      title: 'Where are you?',
      description:
        'We will match you up with users from your city. We respect privacy, so there is no need to access your geolocation service.',
      countryTitle: 'Country',
      cityTitle: 'City',
      countryPickModal: 'Choose country',
      cityButton: 'Choose city',
      cityInputPlaceholder: 'Start typing...',
      apply: 'Apply',
    },
    password: {
      title: 'Password',
      description: "Don't tell anyone",
      passwordInputTitle: 'Password',
      passwordConfirmTitle: 'Password, once again',
      minLength: 'Minimum length is 8 symbols',
      specialSymbol: 'Contains special symbol',
    },
    controls: {
      next: 'Next',
      back: 'Back',
    },
    quit: {
      title: 'Quit to Login Form',
      description: 'Are you sure? \nAll the entered data will be lost.',
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
  },
};
