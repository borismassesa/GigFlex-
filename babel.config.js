const path = require('path');

module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Align the module-resolver with tsconfig paths
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': '.',  // This matches tsconfig.json paths
          },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        },
      ],
      'expo-router/babel',
    ],
    // This tells Babel to ignore .babelrc files in node_modules
    babelrcRoots: ['.'],
    
    // Simplify the "only" section to avoid potential issues
    only: [
      "./**/*.{js,jsx,ts,tsx}",
      "./node_modules/expo-router/**/*.{js,jsx,ts,tsx}",
      "./node_modules/@expo/**/*.{js,jsx,ts,tsx}"
    ],
  };
};