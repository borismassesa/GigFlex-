const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support for web
  isCSSEnabled: true,
});

// Fix resolver issues with alias paths
config.resolver = {
  ...config.resolver,
  sourceExts: [
    'js',
    'jsx',
    'json',
    'ts',
    'tsx',
    'cjs',
    'mjs',
    'd.ts',
  ],
  extraNodeModules: {
    '@': __dirname,
  },
  resolverMainFields: ['browser', 'module', 'main'],
  // Add fallback conditions for better package resolution
  conditions: ['react-native', 'browser', 'module', 'require', 'default'],
};

// Ensure watchFolders includes the project root
config.watchFolders = [
  path.resolve(__dirname),
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;