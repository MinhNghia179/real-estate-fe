module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './components',
            '@schemas': './src/schemas',
            '@services': './src/services',
            '@config': './src/config',
            '@hooks': './hooks',
            '@constants': './constants',
            '@utils': './src/utils',
            '@models': './src/types',
            '@stores': './src/stores',
            '@screens': './src/screens',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
