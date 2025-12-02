import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing localStorage with TypeScript support
 * Provides get, set, and remove operations with automatic serialization/deserialization
 * 
 * @template T - The type of data to store
 * @param key - The localStorage key
 * @param initialValue - Default value if key doesn't exist
 * @returns [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Function to remove the item from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

/**
 * Utility functions for direct localStorage access without React hooks
 */
export const StorageUtil = {
  /**
   * Set a value in localStorage
   */
  setItem: <T,>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  /**
   * Get a value from localStorage
   */
  getItem: <T,>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : (defaultValue ?? null);
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return defaultValue ?? null;
    }
  },

  /**
   * Remove a value from localStorage
   */
  removeItem: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): void => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  /**
   * Get all keys in localStorage
   */
  getAllKeys: (): string[] => {
    try {
      return Object.keys(window.localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  },

  /**
   * Check if a key exists in localStorage
   */
  hasKey: (key: string): boolean => {
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking localStorage key "${key}":`, error);
      return false;
    }
  },
};
