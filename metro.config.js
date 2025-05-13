const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add the additional resolver options
config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
  extraNodeModules: {
    '@supabase/supabase-js': path.resolve(__dirname, 'node_modules/@supabase/supabase-js'),
    '@supabase/gotrue-js': path.resolve(__dirname, 'node_modules/@supabase/gotrue-js'),
  }
};

// Ensure watchFolders includes the project root
config.watchFolders = [
  path.resolve(__dirname),
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;