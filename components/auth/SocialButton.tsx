import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { SvgXml } from 'react-native-svg';

interface SocialButtonProps {
  icon: 'google' | 'apple';
  theme: 'light' | 'dark';
}

const googleIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
<path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
<path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
<path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
</svg>
`;

const appleIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.05 12.536C17.036 10.621 18.059 9.388 19.124 8.642C18.1318 7.20826 16.5339 6.36633 14.83 6.323C13.03 6.135 11.282 7.362 10.363 7.362C9.443 7.362 7.968 6.342 6.443 6.377C4.40422 6.44477 2.57743 7.59542 1.683 9.336C-0.201 12.874 1.2 18.069 3.017 20.932C3.925 22.339 4.987 23.918 6.39 23.861C7.759 23.804 8.29 23.002 9.923 23.002C11.555 23.002 12.039 23.861 13.466 23.828C14.925 23.804 15.839 22.397 16.714 20.981C17.433 19.886 17.981 18.671 18.337 17.383C16.9391 16.8089 15.9981 15.4149 15.954 13.826L17.05 12.536Z" fill="currentColor"/>
<path d="M13.9489 5.1018C14.7376 4.14576 15.1408 2.92767 15.0767 1.688C13.857 1.78314 12.7173 2.3212 11.8688 3.19973C11.0203 4.07827 10.5258 5.23523 10.4823 6.461C11.6911 6.46651 12.8522 5.9948 13.9489 5.1018Z" fill="currentColor"/>
</svg>
`;

export default function SocialButton({ icon, theme }: SocialButtonProps) {
  const colors = Colors[theme];
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: colors.backgroundAlt, borderColor: colors.border }
      ]}
    >
      <View style={styles.iconContainer}>
        {icon === 'google' ? (
          <SvgXml xml={googleIcon} width={24} height={24} />
        ) : (
          <SvgXml 
            xml={appleIcon} 
            width={24} 
            height={24} 
            color={theme === 'dark' ? '#FFFFFF' : '#000000'} 
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});