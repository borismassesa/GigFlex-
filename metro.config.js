const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add custom resolver configuration
config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
  extraNodeModules: {
    '@supabase/postgrest-js': require.resolve('@supabase/postgrest-js'),
  }
};

// Clear cache configuration
config.cacheStores = [];

// Add watchFolders to ensure all necessary directories are monitored
config.watchFolders = [__dirname];

module.exports = config;