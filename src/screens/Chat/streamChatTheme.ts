import {DeepPartial, Theme, Colors} from 'stream-chat-react-native';
import colors from '../../utils/colors';

export const DEFAULT_STATUS_ICON_SIZE = 16;

export const tellrStreamColors = {
  ...Colors,
  accent_blue: colors.primary,
  accent_green: colors.good,
  accent_red: colors.bad,
  bg_gradient_end: colors.background,
  bg_gradient_start: colors.background,
  white: colors.background,
  light_gray: colors.lightGray,
  black: colors.black,
  blue_alice: colors.secondary,
};

export const tellrStreamTheme: DeepPartial<Theme> = {
  colors: tellrStreamColors,
};
