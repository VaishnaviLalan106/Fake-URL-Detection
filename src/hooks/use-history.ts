'use client';

import { useState, useEffect, useCallback } from 'react';
import type { HistoryItem } from '@/lib/types';

const HISTORY_KEY = 'phishguard-history';
const MAX_HISTORY_ITEMS = 20;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(HISTORY_KEY);
      if (item) {
        setHistory(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to read history from localStorage', error);
      setHistory([]);
    }
  }, []);

  const addHistoryItem = useCallback((newItem: HistoryItem) => {
    try {
      setHistory((prevHistory) => {
        // Avoid adding duplicate URLs
        const newHistory = [newItem, ...prevHistory.filter(item => item.url !== newItem.url)].slice(
          0,
          MAX_HISTORY_ITEMS
        );
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (error) {
      console.error('Failed to save history to localStorage', error);
    }
  }, []);

  return { history, addHistoryItem };
}
