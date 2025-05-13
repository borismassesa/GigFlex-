const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support for web
  isCSSEnabled: true,
});

// Add the additional resolver options
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
  extraNodeModules: new Proxy({}, {
    get: (target, name) => path.join(__dirname, `node_modules/${name}`),
  }),
  resolverMainFields: ['browser', 'main'],
};

// Ensure watchFolders includes the project root
config.watchFolders = [
  path.resolve(__dirname),
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;