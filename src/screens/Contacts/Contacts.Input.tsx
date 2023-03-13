import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../../components/Container';
import Field from '../../components/Field';
import Reanimated, {
  FadeInRight,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import {
  blurInput,
  clearInputValue,
  ContactsInputState,
  focusOnInput,
  setInputValue,
} from '../../utils/slices/contactsInputSlice';
import styles from './Contacts.styles';
import Link from '../../components/Links';
import {useTranslation} from 'react-i18next';

const AnimatedView = Reanimated.createAnimatedComponent(View);

const ClearButton = ({onPress, text}: {text: string; onPress: () => void}) => {
  return (
    <AnimatedView
      entering={FadeInRight.duration(300)}
      exiting={FadeOutRight.duration(240)}
      style={{marginLeft: 12}}>
      <Link hitSlop={44} onPress={onPress}>
        {text}
      </Link>
    </AnimatedView>
  );
};

const ContactsInput = () => {
  const dispatch = useDispatch();
  const {inputValue} = useSelector(
    (state: {contactsInput: ContactsInputState}) => state.contactsInput,
  );
  const {t} = useTranslation();

  const handleInput = (value: string) => {
    dispatch(setInputValue(value));
  };

  const handleFocus = () => {
    dispatch(focusOnInput());
  };

  const handleBlur = () => {
    dispatch(blurInput());
  };

  const clearInput = () => {
    dispatch(clearInputValue());
  };

  const shouldRenderClearButton = inputValue.length > 0;

  return (
    <View style={styles.contactsSearchContainer}>
      <Container>
        <AnimatedView style={styles.inputAndClearContainer}>
          <Field
            placeholder={t('app.contacts.search')}
            //@ts-ignore
            layout={Layout.duration(320)}
            value={inputValue}
            onChangeText={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.contactsSearchField}
          />
          {shouldRenderClearButton && (
            <ClearButton text={t('app.contacts.clear')} onPress={clearInput} />
          )}
        </AnimatedView>
      </Container>
    </View>
  );
};

export default ContactsInput;
