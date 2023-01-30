module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest-reanimated.js'],
  setupFilesAfterEnv: [
    './jest-setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation)',
  ],
};
