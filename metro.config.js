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
  disableHierarchicalLookup: true,
  nodeModulesPaths: ['node_modules']
};

config.watchFolders = [path.resolve(__dirname)];

// Optimize the Metro bundler
config.maxWorkers = 4;
config.transformer.minifierPath = 'metro-minify-terser';
config.transformer.minifierConfig = {
  compress: {
    reduce_funcs: false,
    keep_classnames: true,
    keep_fnames: true,
  }
};

module.exports = config;