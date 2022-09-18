import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StatusBar, StatusBarProps} from 'react-native';

function FocusAwareStatusBar({...props}: StatusBarProps) {
  const isFocused = useIsFocused();

  return <StatusBar {...props} />;
}

export default FocusAwareStatusBar;
