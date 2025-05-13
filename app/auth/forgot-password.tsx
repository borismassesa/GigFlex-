import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Mail, ChevronLeft } from 'lucide-react-native';
import AuthHeader from '@/components/auth/AuthHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const { resetPassword, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleResetPassword = async () => {
    setError(null);
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
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
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
            
            <AuthHeader 
              title="Reset Password" 
              subtitle="Enter your email to receive reset instructions" 
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
                  Reset instructions have been sent to your email
                </Text>
              </View>
            )}
            
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.backgroundAlt, borderColor: colors.border }]}>
                  <Mail size={20} color={colors.textDim} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Your email address"
                    placeholderTextColor={colors.textDim}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!isLoading && !success}
                  />
                </View>
              </View>
              
              <TouchableOpacity
                style={[styles.button, { 
                  backgroundColor: '#3c9f50',
                  opacity: isLoading || success ? 0.7 : 1 
                }]}
                onPress={handleResetPassword}
                disabled={isLoading || success}
              >
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textDim }]}>
                Remember your password?
              </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={[styles.footerLink, { color: '#3c9f50' }]}>Sign In</Text>
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
  backButton: {
    marginBottom: 16,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingBottom: 16,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  footerLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 4,
  },
});