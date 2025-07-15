// babel.config.js - VERSIÓN CORREGIDA Y ORDENADA
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // module-resolver va primero
      ['module-resolver', {
        "root": ["./src"],
        "alias": {
          "test": "./test"
        }
      }],

      // reanimated/plugin debe ser el último
      'react-native-reanimated/plugin',
    ]
  };
};