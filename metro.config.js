const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

// Fix MIME type issues by ensuring proper extensions are handled
config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs', 'json'],
  assetExts: [...config.resolver.assetExts, 'db', 'sqlite'],
  extraNodeModules: {
    '@': path.resolve(__dirname),
  },
  resolverMainFields: ['browser', 'main'],
  disableHierarchicalLookup: true,
  nodeModulesPaths: [`${__dirname}/node_modules`]
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
    reduce_vars: false,
    computed_props: false
  }
};

// Fix asset handling
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

// Make sure Metro can properly resolve the alias paths
config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname),
};

module.exports = config;