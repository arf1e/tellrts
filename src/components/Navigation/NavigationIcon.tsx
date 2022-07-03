import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
type Props = {
  focused: boolean;
  color?: string;
  size?: number;
  name: string;
};

const NavigationIcon = ({focused, name}: Props) => {
  const iconColor = focused ? colors.primary : colors.gray;
  const iconName = `${name}-outline`;

  return <Icon color={iconColor} name={iconName} size={28} />;
};

export default NavigationIcon;
