import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {HistoryItem} from '../types/calculator';
import {getHistory} from '../services/historyService';
import HistoryCard from '../components/HistoryCard';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

export default function HistoryScreen({navigation}: Props) {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      getHistory()
        .then(setItems)
        .catch(e => console.warn('Failed to load history:', e));
    }, []),
  );

  const handlePress = useCallback(
    (item: HistoryItem) => {
      navigation.navigate('Home', {restore: item.input});
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={items}
        keyExtractor={item => item.id ?? String(item.createdAt)}
        renderItem={({item}) => (
          <HistoryCard item={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No history yet</Text>
            <Text style={styles.emptySubtitle}>
              Save a calculation to see it here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

