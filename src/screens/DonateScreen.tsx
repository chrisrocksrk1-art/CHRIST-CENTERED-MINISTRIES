import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../App';

const DonateScreen = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const presetAmounts = [10, 25, 50, 100, 250, 500];

  const handleDonate = () => {
    const amount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
    if (amount <= 0) {
      Alert.alert('Error', 'Please select or enter an amount');
      return;
    }
    setShowModal(true);
  };

  const handleProcessPayment = () => {
    if (!isAnonymous && (!donorName.trim() || !donorEmail.trim())) {
      Alert.alert('Error', 'Please provide your name and email');
      return;
    }
    const amount = selectedAmount || customAmount;
    Alert.alert('Success', `Donation of $${amount} processed!`);
    setShowModal(false);
    setSelectedAmount(null);
    setCustomAmount('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Support Our Ministry</Text>
          <Text style={styles.headerSubtitle}>
            Your generosity helps spread the Gospel
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.missionCard}>
            <Ionicons name="heart" size={30} color={COLORS.accent} />
            <Text style={styles.missionText}>
              Every donation supports our mission to serve those in need.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Select Amount</Text>
          <View style={styles.amountsGrid}>
            {presetAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountBtn,
                  selectedAmount === amount && styles.amountBtnActive,
                ]}
                onPress={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
              >
                <Text
                  style={[
                    styles.amountBtnText,
                    selectedAmount === amount && styles.amountBtnTextActive,
                  ]}
                >
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            Or Enter Custom Amount
          </Text>
          <View style={styles.customAmount}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.customInput}
              placeholder="0.00"
              placeholderTextColor={COLORS.lightText}
              value={customAmount}
              onChangeText={(text) => {
                setCustomAmount(text);
                setSelectedAmount(null);
              }}
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity style={styles.donateBtn} onPress={handleDonate}>
            <Ionicons name="heart" size={22} color={COLORS.white} />
            <Text style={styles.donateBtnText}>Proceed to Donation</Text>
          </TouchableOpacity>

          <View style={styles.taxInfo}>
            <Ionicons name="information-circle" size={20} color={COLORS.primary} />
            <Text style={styles.taxInfoText}>
              Christ-Centered Ministries is a 501(c)(3) nonprofit. Your donation is
              tax-deductible.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={28} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Complete Donation</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.amountSummary}>
                <Text style={styles.summaryLabel}>Amount</Text>
                <Text style={styles.summaryAmount}>
                  ${selectedAmount || customAmount}
                </Text>
              </View>

              <View style={styles.toggleSection}>
                <Text style={styles.toggleText}>Donate Anonymously</Text>
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
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={donorName}
                    onChangeText={setDonorName}
                  />

                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    value={donorEmail}
                    onChangeText={setDonorEmail}
                    keyboardType="email-address"
                  />
                </>
              )}

              <Text style={styles.label}>Payment Method</Text>
              {['Credit/Debit Card', 'Apple Pay', 'Google Pay'].map((method) => (
                <TouchableOpacity key={method} style={styles.paymentOption}>
                  <Ionicons name="card" size={24} color={COLORS.primary} />
                  <Text style={styles.paymentText}>{method}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.processBtn}
              onPress={handleProcessPayment}
            >
              <Text style={styles.processBtnText}>
                Complete - ${selectedAmount || customAmount}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
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
  missionCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 1,
  },
  missionText: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  amountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amountBtn: {
    width: '48%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  amountBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  amountBtnText: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
  amountBtnTextActive: { color: COLORS.white },
  customAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  customInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: COLORS.text },
  donateBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  donateBtnText: { color: COLORS.white, fontSize: 14, fontWeight: 'bold', marginLeft: 8 },
  taxInfo: { flexDirection: 'row', backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8 },
  taxInfoText: { fontSize: 11, color: COLORS.text, marginLeft: 10, flex: 1 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  modalBody: { padding: 20 },
  amountSummary: { alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  summaryLabel: { fontSize: 12, color: COLORS.lightText },
  summaryAmount: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary, marginTop: 5 },
  toggleSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  toggleText: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  toggle: { width: 50, height: 28, borderRadius: 14, backgroundColor: '#e0e0e0', justifyContent: 'center', paddingHorizontal: 2 },
  toggleActive: { backgroundColor: COLORS.primary },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.white },
  toggleThumbActive: { alignSelf: 'flex-end' },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13, color: COLORS.text, marginBottom: 10 },
  paymentOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, marginBottom: 8 },
  paymentText: { fontSize: 13, color: COLORS.text, fontWeight: '500', marginLeft: 12 },
  processBtn: { backgroundColor: COLORS.primary, marginHorizontal: 20, marginVertical: 15, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  processBtnText: { color: COLORS.white, fontSize: 14, fontWeight: 'bold' },
});

export default DonateScreen;
