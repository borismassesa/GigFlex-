import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, Phone, Calendar } from 'lucide-react-native';
import AuthHeader from '@/components/auth/AuthHeader';
import SocialButton from '@/components/auth/SocialButton';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const { signUp, isLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleRegister = async () => {
    setError(null);
    
    if (!name) {
      setError('Name is required');
      return;
    }
    
    if (!phone) {
      setError('Phone number is required');
      return;
    }
    
    if (!dob) {
      setError('Date of birth is required');
      return;
    }
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    try {
      await signUp(name, email, password, phone, dob);
      // Navigation will be handled by the AuthContext
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
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
            
            <AuthHeader title="Create Account" subtitle="Sign up to start finding gigs" theme={theme} />
            
            {error && (
              <View style={[styles.errorContainer, { backgroundColor: colors.errorLight }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              </View>
            )}
            
            <View style={styles.form}>
              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.backgroundAlt, borderColor: colors.border }]}>
                  <User size={20} color={colors.textDim} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Your full name"
                    placeholderTextColor={colors.textDim}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
              
              {/* Phone Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Phone Number</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.backgroundAlt, borderColor: colors.border }]}>
                  <Phone size={20} color={colors.textDim} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Your phone number"
                    placeholderTextColor={colors.textDim}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              
              {/* Date of Birth Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Date of Birth</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.backgroundAlt, borderColor: colors.border }]}>
                  <Calendar size={20} color={colors.textDim} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor={colors.textDim}
                    value={dob}
                    onChangeText={setDob}
                  />
                </View>
              </View>
              
              {/* Email Input */}
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
                  />
                </View>
              </View>
              
              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.backgroundAlt, borderColor: colors.border }]}>
                  <Lock size={20} color={colors.textDim} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Create a password"
                    placeholderTextColor={colors.textDim}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
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
              
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#3c9f50', opacity: isLoading ? 0.7 : 1 }]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>
              
              <View style={styles.dividerContainer}>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.textDim }]}>or continue with</Text>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              </View>
              
              <View style={styles.socialButtonsContainer}>
                <SocialButton icon="google" theme={theme} />
                <SocialButton icon="apple" theme={theme} />
              </View>
            </View>
            
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textDim }]}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push('login')}>
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
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginHorizontal: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 24,
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