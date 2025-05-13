const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
  assetExts: [...config.resolver.assetExts, 'db', 'sqlite'],
  extraNodeModules: {
    '@': path.resolve(__dirname),
  },
  resolverMainFields: ['browser', 'main'],
};

config.watchFolders = [path.resolve(__dirname)];

module.exports = config;