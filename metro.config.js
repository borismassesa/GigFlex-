const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support
  isCSSEnabled: true,
});

// Add any additional configuration overrides here
config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
  assetExts: ['ttf', 'woff', 'woff2', 'eot', 'otf', 'png', 'jpg', 'jpeg', 'gif', 'webp'],
};

// Ensure watchFolders includes the project root
config.watchFolders = [
  path.resolve(__dirname, '.'),
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;