import {MIN_PWD_LENGTH} from '../screens/Register/Register.utils';

export default {
  navigation: {
    PROFILE_NAVIGATOR: 'Profile',
    SEARCH: 'Search',
    CONTACTS: 'Contacts',
    SETTINGS: 'Settings',
    UPDATE_PHOTO: 'Update photo',
    CATEGORIES: 'Categories',
    STATISTICS: 'Statistics',
    QUESTIONS: 'Questions',
    EDIT_ANSWER: 'Edit Answer',
    UPDATE_BIO: 'Update bio',
    UPDATE_PASSWORD: 'Update password',
    UPDATE_CITY: 'Update city',
    SEARCH_PARAMETERS: 'Search Parameters',
    SOCIALS: 'Social Networks Accounts',
    ATTACH_INSTAGRAM: 'Connect Instagram',
    UPDATE_LANGUAGE: 'Interface Language',
    ATTACH_TELEGRAM: 'Connect Telegram',
    INCOMING_REQUESTS: 'Incoming Requests',
  },
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
    email: {
      errors: {
        incorrectEmail: 'Incorrect email',
      },
    },
  },
  app: {
    updateLanguage: {
      description:
        'Updating language means your Questions will need to be updated too.',
    },
    contacts: {
      search: 'Search by name...',
      clear: 'Clear',
      contactsList: {
        error: {
          title: 'We could not reach the server.',
          description:
            'Please make sure you are connected to the internet and try again.',
          retryBtnTitle: 'Try again',
        },
      },
    },
    profile: {
      lines: 'Questions',
      addNewLine: 'Add',
      addFirstLine: 'Add your first answer',
      addFirstLineDescription: "It's not that scary",
      setBio: 'Drop a few lines ',
      statistics: 'Statistics',
      seeDetails: 'Details',
      displayImpression: 'Most popular first impression',
      interactionTitle: 'Interactions',
      interactionTitle_0: 'Interaction',
      interactionTitle_1: 'Interactions',
      interactionTitle_2: 'Interactions',
      interactionTitle_4: 'Interactions',
      interactionTitle_5: 'Interactions',
      interactionsDescription: 'In the last month',
      successRate: 'Correct guesses',
      successRateDescription: 'In incoming requests',
      errorCap: {
        title: 'Failed to get your profile data',
        description: 'Check your internet connection and try again please.',
      },
    },
    chat: {
      fieldPlaceholder: 'Write a message...',
    },
    contact: {
      descriptionTitle: 'Profile Description',
      myRequestTitle: 'My guesses',
      anketsTitle: 'Ankets',
      otherRequestTitle: 'Incoming guesses',
      impressionsTitle: 'First Impression',
      profilingTitle: 'Profiling',
      guessesTitle: 'Guesses',
      takes: {
        name: 'Name',
      },
      successRateTitle: 'Correct guesses',
      correctAnswerTitle: 'Correct answer:',
    },
    anket: {
      descriptionTitle: 'Profile Description',
      matchMessage: {
        title: "That's a Match!",
        description: 'You can find this user on your Contacts screen now.',
      },
      rate: {
        low: {
          title: 'At least you tried',
          description: "Don't worry, it doesn't even matter that much.",
        },
        medium: {
          title: 'Could be better!',
          description: 'Actually, it is a quite good result.',
        },
        good: {
          title: 'Woah!',
          description: 'Brilliant result',
        },
        hundred: {
          title: 'Hundred!',
          description: 'I cant come up with description for it',
        },
      },
      flashActions: {
        seeRequest: 'See your request',
        toIndex: 'Get to the index screen',
      },
      tip: {
        button: 'Complete',
        description:
          'All the right answers to the anket will be available after receiving the request from user. ',
      },
      controls: {
        quit: 'Quit',
        previous: 'Go Back',
        next: 'Next',
        complete: 'Submit',
        quitTitle: 'Cancel Form Submitting',
        quitDescription:
          'Please, confirm this action!\nAll the progress will be lost, and the users list on the initial screen will completely update if you quit.',
        quitConfirm: 'Reset form',
        quitCancel: 'Continue form submitting',
        descriptionOk: 'Got it',
      },
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
      questions: {
        title: 'Questions',
        description: 'How this person would answer these questions?',
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
      app: {
        title: 'App',
        language: 'Interface Language',
        email: 'E-mail <coming soon!>',
        about: 'About',
      },
      photo: {
        title: 'Photo',
        changePhoto: 'Change Photo',
        successMessage: {
          title: 'Great!',
          body: 'Your photo was updated',
        },
        errorMessage: {
          title: 'We could not reach the server',
          body: 'Failed to update your photo',
        },
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
        errorMessage: {
          title: 'We could not reach the server',
          body: 'Failed to update your bio.',
        },
      },
      location: {
        confirm: 'Confirm',
        success: {
          title: 'Success!',
          message: 'Your location was updated.',
        },
        error: {
          title: 'Uh oh!',
          message: 'Failed to update your location.',
        },
      },
      socialLinks: {
        title: 'Social Networks Accounts',
        navigate: 'Social Networks',
        connectInstagramTitleBeforeUsername: 'Connect Instagram account ',
        connectInstagramTitleAfterUsername: 'to your tellr profile?',
        connectInstagramDescription:
          'This action can be reverted at any moment',
        connectInstagramConfirm: 'Connect',
        connectInstagramCancel: 'Cancel',
        addLink: 'Connect new account',
        noCurrentInstagramAttached: 'Connect account',
        telegram: {
          networkError: 'Could not reach the server',
          networkErrorDescription: 'Please, check your internet connection',
          humanReadableError: 'Failed to generate the code',
          errorHeading: 'We could not generate Telegram code',
          retryButtonTitle: 'Try again',
        },
      },
      profile: {
        settingsTitle: 'Profile',
        photos: 'Photo',
        bio: 'Bio',
        profession: 'Job <coming soon!>',
        socialLinks: 'Social Networks',
        email: 'E-mail',
        emailHolder: 'Waiting for the server response...',
        city: 'City',
        cityHolder: 'Ждем название города от сервера...',
        changePassword: 'Update password',
        logout: 'Log Out',
        errorMessage: {
          title: 'Oh!',
          message: 'We could not reach the server.',
        },
      },
      password: {
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        newPasswordConfirm: 'Confirm New Password',
        apply: 'Change Password',
        description:
          'You have to enter your current password in order to update it.',
        schema: {
          currentRequired: 'Enter your password',
          minPassword: `Мin password length is ${MIN_PWD_LENGTH} symbols.`,
          newRequired: 'Enter your new password',
          newMinUppercase:
            'Password should contain at least one uppercase letter.',
          confirmNewRequired: 'Enter your new password once again',
          shouldMatch: 'New password and its confirmation should match',
        },
        errorMessage: {
          title: 'Не удалось обновить пароль',
          message: 'Проверьте введенные данные.',
        },
        successMessage: {
          title: 'Отлично!',
          body: 'Пароль обновлён.',
        },
      },
    },
    questions: {
      answerPlaceholder: 'Whatever you think. Really',
      deleteAnswer: 'Delete answer',
      saveAnswer: 'Confirm',
      notificationTitle: 'Got it!',
      notificationDescription:
        'Your answer is already available in your profile.',
    },
    search: {
      modalTitle: 'User',
      modalBio: 'Bio',
      modalGoBack: 'Cancel',
      modalStart: 'Start',
      modalBioPlaceholder: 'This user has no bio.',
      params: {
        link: 'Parameters',
        location: {
          title: 'Location',
          description: 'Search for users..',
          local: 'From my city',
        },
      },
      error: {
        title: 'We could not reach the server.',
        description:
          'No response from the server. Please check your internet connection and swipe down to try again.',
      },
      noResult: {
        title: 'We could not find anyone.',
        description:
          'There is no users in our database matching your search params. You can update those params in Search Parameters.',
        btnTitle: 'Open Search Params',
      },
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
