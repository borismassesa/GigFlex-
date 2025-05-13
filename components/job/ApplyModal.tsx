import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { X } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface ApplyModalProps {
  isVisible: boolean;
  onClose: () => void;
  jobId: string;
  onSuccess: () => void;
}

export default function ApplyModal({ isVisible, onClose, jobId, onSuccess }: ApplyModalProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { user } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  
  const handleSubmit = async () => {
    if (!user) return;
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      const { error: applicationError } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          user_id: user.id,
          cover_letter: coverLetter.trim() || null,
          status: 'pending'
        });
      
      if (applicationError) throw applicationError;
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Apply for Job</Text>
            <TouchableOpacity onPress={onClose} disabled={isSubmitting}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          {error && (
            <View style={[styles.errorContainer, { backgroundColor: colors.errorLight }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          )}
          
          <View style={styles.form}>
            <Text style={[styles.label, { color: colors.text }]}>Cover Letter (Optional)</Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: colors.backgroundAlt,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              placeholder="Tell us why you're a great fit for this role..."
              placeholderTextColor={colors.textDim}
              multiline
              numberOfLines={6}
              value={coverLetter}
              onChangeText={setCoverLetter}
              editable={!isSubmitting}
            />
          </View>
          
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: colors.primary },
              isSubmitting && { opacity: 0.7 }
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.cardText} />
            ) : (
              <Text style={[styles.submitText, { color: colors.cardText }]}>
                Submit Application
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
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
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});