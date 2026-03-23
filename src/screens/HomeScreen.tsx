import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import InputField from '../components/InputField';
import ResultCard from '../components/ResultCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const [price, setPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [voucher, setVoucher] = useState('');
  const [shipping, setShipping] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <InputField
            label="Original Price"
            value={price}
            onChangeText={setPrice}
            placeholder="0"
          />
          <InputField
            label="Discount %"
            value={discountPercent}
            onChangeText={setDiscountPercent}
            placeholder="0"
            suffix="%"
          />
          <InputField
            label="Max Discount"
            value={maxDiscount}
            onChangeText={setMaxDiscount}
            placeholder="0 = no cap"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extra</Text>
          <InputField
            label="Voucher"
            value={voucher}
            onChangeText={setVoucher}
            placeholder="0"
          />
          <InputField
            label="Shipping"
            value={shipping}
            onChangeText={setShipping}
            placeholder="0"
          />
        </View>

        <ResultCard finalPrice={0} savedAmount={0} />

        <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('History')}>
          <Text style={styles.historyButtonText}>View History</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  historyButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  historyButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
});
