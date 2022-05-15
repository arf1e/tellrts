import {TextProps} from 'react-native';

interface TypographyInterface extends TextProps {
  children: string;
  style?: object;
}

export default TypographyInterface;
