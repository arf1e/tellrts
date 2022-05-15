import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
}

const DismissKeyboard = ({children}: Props): React.ReactElement<any> => (
  <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}
    touchSoundDisabled>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
