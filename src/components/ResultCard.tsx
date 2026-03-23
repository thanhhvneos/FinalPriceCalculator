import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  finalPrice: number;
  savedAmount: number;
};

export default function ResultCard({finalPrice, savedAmount}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Result</Text>
      <View style={styles.row}>
        <Text style={styles.labelText}>Final Price</Text>
        <Text style={styles.finalPrice}>{finalPrice.toLocaleString()}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.labelText}>You Save</Text>
        <Text style={styles.savedAmount}>{savedAmount.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  heading: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
  },
  labelText: {
    fontSize: 14,
    color: '#6B7280',
  },
  finalPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  savedAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
});
