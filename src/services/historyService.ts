import AsyncStorage from '@react-native-async-storage/async-storage';
import {HistoryItem} from '../types/calculator';

const STORAGE_KEY = '@history';

export async function saveHistory(item: HistoryItem): Promise<void> {
  const existing = await getHistory();
  const updated = [item, ...existing];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function getHistory(): Promise<HistoryItem[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  return JSON.parse(raw) as HistoryItem[];
}

export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
