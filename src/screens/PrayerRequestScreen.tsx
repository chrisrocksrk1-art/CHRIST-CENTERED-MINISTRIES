import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../App';

const PrayerRequestScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [prayer, setPrayer] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!prayer.trim()) {
      Alert.alert('Error', 'Please enter your prayer request');
      return;
    }
    if (!isAnonymous && (!name.trim() || !email.trim())) {
      Alert.alert('Error', 'Please provide your name and email');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPrayer('');
      setSubmitted(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={80} color={COLORS.primary} />
          <Text style={styles.successTitle}>Thank You!</Text>
          <Text style={styles.successMessage}>
            Your prayer request has been submitted.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Prayer Requests</Text>
            <Text style={styles.headerSubtitle}>
              Share your prayer requests
            </Text>
          </View>

          <View style={styles.content}>
            <View style={styles.infoCard}>
              <Ionicons name="prism" size={24} color={COLORS.accent} />
              <Text style={styles.infoText}>
                Your prayer requests will be shared with our prayer team.
              </Text>
            </View>

            <View style={styles.toggleSection}>
              <View style={styles.toggleLabel}>
                <Ionicons name="eye-off" size={20} color={COLORS.primary} />
                <Text style={styles.toggleText}>Anonymous</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggle,
                  isAnonymous && styles.toggleActive,
                ]}
                onPress={() => setIsAnonymous(!isAnonymous)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    isAnonymous && styles.toggleThumbActive,
                  ]}
                />
              </TouchableOpacity>
            </View>

            {!isAnonymous && (
              <>
                <Text style={styles.label}>Your Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor={COLORS.lightText}
                  value={name}
                  onChangeText={setName}
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor={COLORS.lightText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </>
            )}

            <Text style={styles.label}>Prayer Request</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Share your prayer request here..."
              placeholderTextColor={COLORS.lightText}
              value={prayer}
              onChangeText={setPrayer}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Ionicons name="send" size={20} color={COLORS.white} />
              <Text style={styles.submitBtnText}>Submit Prayer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  keyboardView: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.lightText,
    marginTop: 3,
  },
  content: { padding: 20 },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: { color: COLORS.white, fontSize: 12, marginLeft: 10, flex: 1 },
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  toggleLabel: { flexDirection: 'row', alignItems: 'center' },
  toggleText: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginLeft: 10 },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: { backgroundColor: COLORS.primary },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  toggleThumbActive: { alignSelf: 'flex-end' },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 8, marginTop: 10 },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 10,
  },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  submitBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  submitBtnText: { color: COLORS.white, fontSize: 14, fontWeight: 'bold', marginLeft: 8 },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 15,
  },
  successMessage: {
    fontSize: 13,
    color: COLORS.text,
    marginTop: 8,
  },
});

export default PrayerRequestScreen;
