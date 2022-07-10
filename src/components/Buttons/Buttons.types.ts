import {PressableProps} from 'react-native';

interface ButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
}

export default ButtonProps;
