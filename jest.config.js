const {defaults: tsjPreset} = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  moduleDirectories: ['node_modules/', '/src/screens/Login'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
