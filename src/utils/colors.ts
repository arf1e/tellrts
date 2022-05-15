const colors = {
  primary: '#1693A5',
  secondary: '#BCD8DD',
  background: '#FDFFFF',
  black: '#031315',
  darkGray: '#1D2C2E',
  gray: '#4D5C5F',
  lightGray: '#819396',
  light: '#C4D3D6',
  primaryReverse: '#DC8DCB',
  bad: '#EF5680',
  good: '#3FA471',
  unsaturatedPrimary: '#147A89',
};

type ColorVariablesObj = {
  [key: string]: string;
};

// color variables for EStyleSheet @ App.tsx
const generateColorVariables = (): object => {
  const result: ColorVariablesObj = {};
  for (const [key, value] of Object.entries(colors)) {
    result['$' + key] = value;
  }
  return result;
};

export const colorVariables = generateColorVariables();

export default colors;
