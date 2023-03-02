import {PressableProps} from 'react-native';

interface ButtonProps extends PressableProps {
  title: string;
  icon?: string;
  loading?: boolean;
}

export default ButtonProps;
