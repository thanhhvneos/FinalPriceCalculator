import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {HistoryItem} from '../types/calculator';

type Props = {
  item: HistoryItem;
  onPress: (item: HistoryItem) => void;
};

export default function HistoryCard({item, onPress}: Props) {
  const date = new Date(item.createdAt).toLocaleString();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}>
      <View style={styles.row}>
        <Text style={styles.label}>Final Price</Text>
        <Text style={styles.finalPrice}>
          {item.result.finalPrice.toLocaleString()}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Saved</Text>
        <Text style={styles.saved}>
          {item.result.savedAmount.toLocaleString()}
        </Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
  },
  finalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  saved: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  date: {
    marginTop: 6,
    fontSize: 11,
    color: '#9CA3AF',
  },
});
