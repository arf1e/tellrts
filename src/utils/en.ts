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
  app: {
    anket: {
      descriptionTitle: 'Profile Description',
      impressions: {
        title: 'First Impression',
        description: 'You can pick as many as you like',
        pretty: {
          female: 'Beautiful',
          male: 'Handsome',
        },
        cute: {
          female: 'Cute',
          male: 'Cute',
        },
        hot: {
          female: 'Hot',
          male: 'Hot',
        },
        shy: {
          female: 'Shy',
          male: 'Shy',
        },
        party: {
          female: 'Partygirl',
          male: 'Partyboy',
        },
        art: {
          female: 'Artistic',
          male: 'Artistic',
        },
      },
      profiling: {
        title: 'Profiling',
        description: `This actually has nothing to do with profiling. ${'\n'}We just like the word.`,
        name: {
          question: 'Your name is',
        },
      },
    },
    navigation: {
      goBack: 'Back',
    },
    settings: {
      confirmLogoutTitle: 'Confirm Logout',
      confirmLogoutDesc: 'Please confirm logout',
      cancelLogout: 'Cancel',
      confirmLogout: 'Logout',
      photo: {
        title: 'Photo',
        changePhoto: 'Change Photo',
      },
      bio: {
        title: 'Bio',
        changeBio: 'Update bio',
        placeholder: 'So you like pizza and travelling? Wow, so unusual!',
        btnTitle: 'Update bio',
        successMessage: {
          title: 'Success!',
          body: 'Your bio was updated!',
        },
      },
      socialLinks: {
        title: 'Social Links',
        addLink: 'Connect new social account',
      },
      profile: {
        title: 'Profile',
        email: 'E-mail',
        city: 'City',
        changePassword: 'Change Password',
        logout: 'Logout',
      },
      password: {
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        newPasswordConfirm: 'Confirm New Password',
        apply: 'Change Password',
        description:
          'You have to enter your current password in order to update it.',
      },
    },
    questions: {
      answerPlaceholder: 'Whatever you think. Really',
    },
    search: {
      modalTitle: 'User',
      modalBio: 'Bio',
      modalGoBack: 'Cancel',
      modalStart: 'Start',
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
      minLength: 'Password length should be at least 8 symbols',
      uppercase: 'Password should contain one uppercase letter',
      number: 'Password should contain one number',
      passwordsShouldBeEqual: 'Both fields should be equal',
    },
    check: {
      title: 'Final check-up',
      description:
        'Please check your data for typos and mistakes. Tap any field to navigate to the corresponding step.',
      noValue: 'No value',
      emailTitle: 'Email',
      nameTitle: 'Name',
      dobTitle: 'DOB',
      sexTitle: 'Sex',
      cityTitle: 'City',
      emailFieldTitle: 'Email',
      emailFieldPlaceholder: 'example@mail.com',
      emailApplyButton: 'Apply',
      registerError: 'Sign Up Error',
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
