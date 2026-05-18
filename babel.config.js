module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
          '@app': './src/app',
          '@pages': './src/pages',
          '@widgets': './src/widgets',
          '@features': './src/features',
          '@entities': './src/entities',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};
