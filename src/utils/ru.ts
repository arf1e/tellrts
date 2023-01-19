import {MIN_PWD_LENGTH} from '../screens/Register/Register.utils';

export default {
  navigation: {
    PROFILE_NAVIGATOR: 'Профиль',
    SEARCH: 'Поиск',
    CONTACTS: 'Контакты',
    SETTINGS: 'Настройки',
    UPDATE_PHOTO: 'Обновить фотографию',
    CATEGORIES: 'Категории',
    STATISTICS: 'Статистика',
    QUESTIONS: 'Вопросы',
    EDIT_ANSWER: 'Обновить ответ',
    UPDATE_BIO: 'Обновить описание',
    UPDATE_PASSWORD: 'Обновить пароль',
    UPDATE_CITY: 'Обновить город',
    SEARCH_PARAMETERS: 'Параметры поиска',
    SOCIALS: 'Аккаунты в соцсетях',
    ATTACH_INSTAGRAM: 'Привязать аккаунт Instagram',
    UPDATE_LANGUAGE: 'Изменить язык интерфейса',
  },
  login: {
    description: 'Дэйтинг - это не так стрёмно как ты думаешь',
    form: {
      title: 'Войти или зарегистрироваться',
      emailFieldTitle: 'Электропочта',
      emailPlaceholder: 'Первый шаг к новым знакомствам',
      btnTitle: 'Продолжить',
      signUpBtn: 'Зарегистрироваться',
      loginBtn: 'Войти',
      passwordFieldTitle: 'Пароль',
    },
  },
  app: {
    contacts: {
      search: 'Поиск',
      clear: 'Очистить',
    },
    updateLanguage: {
      description:
        'Изменение языка интерфейса приводит к тому, что текущие вопросы и ответы будут скрыты, и мы попросим вас создать новые, которые будут связаны с новым языком интерфейса.',
    },
    profile: {
      lines: 'Вопросы и ответы',
      addNewLine: 'Добавить',
      addFirstLine: 'Добавить первый ответ',
      addFirstLineDescription: 'Это не больно',
      setBio: 'Добавить описание профиля',
      statistics: 'Статистика',
      seeDetails: 'Детали',
      displayImpression: 'Самое частое первое впечатление',
      interactionTitle_0: 'Интеракция',
      interactionTitle_1: 'Интеракции',
      interactionTitle_2: 'Интеракций',
      interactionTitle_4: 'Интеракции',
      interactionTitle_5: 'Интеракций',
      interactionsDescription: 'За последний месяц',
      successRate: 'Правильных ответов',
      successRateDescription: 'Других пользователей во входящих анкетах',
      errorCap: {
        title: 'Не получилось загрузить данные профиля.',
        description:
          'Пожалуйста, проверьте подключение к Интернету и попробуйте ещё раз.',
      },
    },
    chat: {
      fieldPlaceholder: 'Напиши сообщение...',
    },
    contact: {
      descriptionTitle: 'Описание профиля',
      myRequestTitle: 'Моя анкета',
      anketsTitle: 'Анкеты',
      otherRequestTitle: 'Встречная анкета',
      impressionsTitle: 'Первое впечатление',
      profilingTitle: 'Профайлинг',
      guessesTitle: 'Предположения',
      takes: {
        name: 'Имя',
      },
      successRateTitle: 'Правильных ответов',
      correctAnswerTitle: 'Правильный ответ:',
    },
    anket: {
      descriptionTitle: 'Описание профиля',
      rate: {
        low: {
          title: 'Попытка - не пытка!',
          description: 'Не переживай, это всё не так уж и важно.',
        },
        medium: {
          title: 'Могло быть лучше!',
          description: 'Но на самом деле это очень хороший результат.',
        },
        good: {
          title: 'Вы восхитительны!',
          description: 'Отличный результат, тебе пора в сыщики',
        },
        hundred: {
          title: 'Сто из ста!',
          description: 'Найду я даже прыщик на теле у слона...',
        },
      },
      flashActions: {
        seeRequest: 'Посмотреть мою заявку',
        toIndex: 'Перейти в начало',
      },
      tip: {
        button: 'Перейти в начало',
        description:
          'Правильные ответы и доступ к переписке с пользователем станут доступны после встречной анкеты.',
      },
      controls: {
        quit: 'Выйти',
        previous: 'Назад',
        next: 'Далее',
        complete: 'Завершить',
        quitTitle: 'Отменить заполнение анкеты',
        quitDescription:
          'Пожалуйста, подтвердите это действие.\nПрогресс будет потерян, а список пользователей на предыдущем экране обновится.',
        quitConfirm: 'Выйти из формы',
        quitCancel: 'Продолжить заполнение',
      },
      impressions: {
        title: 'Первое впечатление',
        description: 'Допустимы любые комбинации.',
        pretty: {
          female: 'Красивая',
          male: 'Красивый',
        },
        cute: {
          female: 'Милая',
          male: 'Милый',
        },
        hot: {
          female: 'Хот',
          male: 'Хот',
        },
        shy: {
          female: 'Скромная',
          male: 'Скромный',
        },
        party: {
          female: 'Тусовщица',
          male: 'Тусовщик',
        },
        art: {
          female: 'Творческая',
          male: 'Творческий',
        },
      },
      profiling: {
        title: 'Профайлинг',
        description: `На самом деле тут нет ничего общего с профайлингом. ${'\n'}Нам просто нравится слово.`,
        name: {
          question: 'Тебя зовут',
        },
      },
      questions: {
        title: 'Вопросы',
        description:
          'Как бы человек на фотографии мог ответить на эти вопросы?',
      },
    },
    navigation: {
      goBack: 'Назад',
    },
    settings: {
      confirmLogoutTitle: 'Выход из учетной записи',
      confirmLogoutDesc:
        'Нам нужно убедиться, что вы не нажали эту кнопку случайно.',
      cancelLogout: 'Отменить',
      confirmLogout: 'Выйти из учетной записи',
      app: {
        title: 'Приложение',
        language: 'Язык интерфейса',
        about: 'О приложении',
      },
      account: {
        title: 'Учётные данные',
      },
      photo: {
        title: 'Фотография',
        changePhoto: 'Изменить фотографию',
        successMessage: {
          title: 'Отлично!',
          body: 'Фотография обновлена.',
        },
        errorMessage: {
          title: 'Не можем достучаться до сервера.',
          body: 'Не удалось обновить фотографию.',
        },
      },
      bio: {
        title: 'Описание',
        changeBio: 'Обновить описание профиля',
        placeholder: 'Краткость - сестра таланта',
        btnTitle: 'Обновить описание',
        successMessage: {
          title: 'Отлично!',
          body: 'Описание профиля обновлено.',
        },
        errorMessage: {
          title: 'Не можем достучаться до сервера.',
          body: 'Не удалось обновить описание профиля.',
        },
      },
      location: {
        confirm: 'Подтвердить',
        success: {
          title: 'Отлично!',
          message: 'Информация в твоем профиле обновлена.',
        },
        error: {
          title: 'Ошибка!',
          message: 'Не удалось обновить локацию. Проверьте подключение к сети.',
        },
      },
      socialLinks: {
        title: 'Соцсети',
        connectInstagramTitleBeforeUsername: 'Привязать Instagram-аккаунт ',
        connectInstagramTitleAfterUsername: 'к профилю?',
        connectInstagramDescription:
          'Это действие можно будет отменить в любой момент.',
        connectInstagramConfirm: 'Привязать',
        connectInstagramCancel: 'Отменить',
        addLink: 'Добавить новый аккаунт',
        noCurrentInstagramAttached: 'Привязать профиль',
      },
      profile: {
        title: 'Профиль',
        email: 'Электропочта',
        emailHolder: 'Ждем адрес почты от сервера...',
        city: 'Город',
        cityHolder: 'Ждем название города от сервера...',
        changePassword: 'Обновить пароль',
        logout: 'Выйти из учетной записи',
        errorMessage: {
          title: 'Ой!',
          message: 'Нет подключения к серверу.',
        },
      },
      password: {
        currentPassword: 'Текущий пароль',
        newPassword: 'Новый пароль',
        newPasswordConfirm: 'Новый пароль еще раз',
        apply: 'Изменить пароль',
        description: 'Введи свой текущий пароль для обновления',
        schema: {
          currentRequired: 'Введите ваш пароль',
          minPassword: `Минимальная длина пароля - ${MIN_PWD_LENGTH} символов.`,
          newRequired: 'Введите новый пароль',
          newMinUppercase: 'Пароль должен содержать символ верхнего регистра',
          confirmNewRequired: 'Введите новый пароль еще раз',
          shouldMatch: 'Новый пароль и его подтверждение должны совпадать',
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
      answerPlaceholder: 'Это почти как в твиттере',
      deleteAnswer: 'Удалить ответ',
      saveAnswer: 'Подтвердить',
      notificationTitle: 'Принято!',
      notificationDescription: 'Ответ на вопрос уже доступен в вашем профиле.',
    },
    search: {
      modalTitle: 'Анкета',
      modalBio: 'Описание профиля',
      modalGoBack: 'Отмена',
      modalStart: 'Заполнить анкету',
    },
  },
  register: {
    name: {
      title: 'Как тебя зовут?',
      description: 'Познакомь нас с собой и мы начнём знакомить тебя с другими',
      fieldTitle: 'Меня зовут',
      fieldPlaceholder: 'Как в паспорте',
    },
    birthday: {
      title: 'Когда дарить торт?',
      description: 'Мы будем показывать только твой возраст',
      fieldTitle: 'Мой день рождения',
      placeholder: 'ДД-MM-ГГГГ',
      errors: {
        tooYoung: 'Прости, амиго, мы регистрируем только с 16 лет.',
        tooOld: 'Юмор - это хорошо, но он не всегда уместен.',
      },
    },
    sex: {
      title: 'Пол',
      description: 'Нам уже угрожают в Твиттере за этот вопрос.',
      male: 'Джентельмен',
      female: 'Леди',
    },
    photo: {
      title: 'Фотография',
      description: 'Прости, без нее у нас никак.',
      gallery: 'Выбрать из галереи',
      camera: 'Сделать фото',
      descriptionAttached:
        'Отлично! Если тебя устраивает эта фотография, можно двигаться дальше.',
      changePhotoHint: 'Нажми на фотографию, чтобы заменить её.',
      editPhoto: 'Редактировать фотографию.',
      errors: {
        photoEditError: 'Во время обработки фотографии возникла ошибка.',
      },
    },
    location: {
      title: 'Ты где?',
      description:
        'Будем знакомить тебя с пользователями из твоего города. Мы уважаем приватность, так что нам не нужен доступ к твоему сервису геолокации.',
      countryTitle: 'Страна',
      cityTitle: 'Город',
      countryPickModal: 'Выбрать страну',
      cityButton: 'Ввести название города',
      cityInputPlaceholder: 'Начни вводить название города...',
      apply: 'Сохранить',
    },
    password: {
      title: 'Пароль',
      description: 'Лучше держать в тайне',
      passwordInputTitle: 'Пароль',
      passwordConfirmTitle: 'Пароль ещё раз',
      minLength: 'Минимальная длина пароля - 8 символов',
      uppercase: 'Пароль содержит как минимум одну букву верхнего регистра',
      number: 'Пароль содержит как минимум одну цифру',
      passwordsShouldBeEqual: 'Пароль и подтверждение пароля должны совпадать',
    },
    check: {
      title: 'Финальная проверка',
      description:
        'Пожалуйста, проверь данные на предмет ошибок и опечаток. На значения можно нажимать для перехода к соответствующему шагу формы.',
      noValue: 'Не заполнено',
      emailTitle: 'Электронная почта',
      nameTitle: 'Имя',
      dobTitle: 'Дата рождения',
      sexTitle: 'Пол',
      cityTitle: 'Город',
      emailFieldTitle: 'Адрес электронной почты',
      emailFieldPlaceholder: 'example@mail.com',
      emailApplyButton: 'Сохранить',
      registerError: 'В процессе регистрации возникла ошибка.',
    },
    controls: {
      next: 'Далее',
      back: 'Назад',
    },
    quit: {
      title: 'Отменить регистрацию',
      description: 'Вы уверены? \nВесь прогресс будет потерян',
      cancel: 'Продолжить регистрацию',
      confirm: 'Отменить регистрацию',
    },
  },
};
