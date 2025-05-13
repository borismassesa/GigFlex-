import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Lock, Eye, EyeOff } from 'lucide-react-native';
import AuthHeader from '@/components/auth/AuthHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UpdatePasswordScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const { updatePassword, isLoading } = useAuth();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleUpdatePassword = async () => {
    setError(null);
    
    if (!password || !confirmPassword) {
      setError('Both fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await updatePassword(password);
      setSuccess(true);
      setTimeout(() => {
        router.replace('/auth/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to update password. Please try again.');
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <LinearGradient
          colors={theme === 'dark' 
            ? ['#121212', '#1a1a1a'] 
            : ['#f8f9fa', '#e9ecef']}
          style={styles.gradientBackground}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <AuthHeader 
              title="Update Password" 
              subtitle="Create a new password for your account" 
              theme={theme} 
            />
            
            {error && (
              <View style={[styles.errorContainer, { backgroundColor: colors.errorLight }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              </View>
            )}
            
            {success && (
              <View style={[styles.successContainer, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.successText, { color: colors.primary }]}>
                  Password updated successfully! Redirecting...
                </Text>
              </View>
            )}
            
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>New Password</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.backgroundAlt, borderColor: colors.border }]}>
                  <Lock size={20} color={colors.textDim} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter new password"
                    placeholderTextColor={colors.textDim}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading && !success}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} color={colors.textDim} />
                    ) : (
                      <Eye size={20} color={colors.textDim} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Confirm Password</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.backgroundAlt, borderColor: colors.border }]}>
                  <Lock size={20} color={colors.textDim} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Confirm new password"
                    placeholderTextColor={colors.textDim}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading && !success}
                  />
                </View>
              </View>
              
              <TouchableOpacity
                style={[styles.button, { 
                  backgroundColor: '#3c9f50',
                  opacity: isLoading || success ? 0.7 : 1 
                }]}
                onPress={handleUpdatePassword}
                disabled={isLoading || success}
              >
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  successContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  successText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  form: {
    marginTop: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});