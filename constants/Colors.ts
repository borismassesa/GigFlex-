const tintColorLight = '#3c9f50'; // Green instead of blue
const tintColorDark = '#4caf50'; // Green for dark mode

export default {
  light: {
    text: '#000000',
    textDim: '#666666',
    background: '#f8f9fa',
    backgroundAlt: '#ffffff',
    backgroundOffset: '#f0f2f5',
    tint: tintColorLight,
    tabIconDefault: '#cccccc',
    tabIconSelected: tintColorLight,
    border: '#e0e0e0',
    card: '#ffffff',
    cardText: '#ffffff',
    primary: '#3c9f50',         // Main green
    primaryLight: '#e9f7ee',    // Light green background
    secondary: '#4d924b',       // Slightly darker green for contrast
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    errorLight: '#ffebee',
    info: '#17a2b8',
  },
  dark: {
    text: '#ffffff',
    textDim: '#a0a0a0',
    background: '#121212',
    backgroundAlt: '#1e1e1e',
    backgroundOffset: '#252525',
    tint: tintColorDark,
    tabIconDefault: '#666666',
    tabIconSelected: tintColorDark,
    border: '#333333',
    card: '#1e1e1e',
    cardText: '#ffffff',
    primary: '#4caf50',         // Slightly lighter green for dark mode
    primaryLight: '#143a17',    // Darker green that's still visible
    secondary: '#67b96a',       // Lighter green for contrast in dark mode
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    errorLight: '#3d1c1e',
    info: '#17a2b8',
  },
};