# Local Storage Implementation Guide

This guide explains how to use the localStorage system in your BetBrain application.

## Overview

The localStorage implementation consists of:
1. **`useLocalStorage` hook** - React hook for component-level storage
2. **`StorageUtil` utility** - Direct storage access without React
3. **`STORAGE_KEYS`** - Centralized key constants

---

## 1. Using the `useLocalStorage` Hook (React Components)

### Basic Usage

```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export function MyComponent() {
  // Store a string
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Store an object
  const [userPrefs, setUserPrefs] = useLocalStorage('userPrefs', {
    notifications: true,
    language: 'en',
  });

  // Store an array
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme: {theme}
      </button>
    </div>
  );
}
```

### With Storage Keys Constants

```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export function WalletComponent() {
  const [balance, setBalance] = useLocalStorage(STORAGE_KEYS.WALLET_BALANCE, 0);
  const [transactions, setTransactions] = useLocalStorage(
    STORAGE_KEYS.TRANSACTION_HISTORY,
    []
  );

  const addTransaction = (amount: number) => {
    setBalance(prev => prev + amount);
    setTransactions(prev => [
      ...prev,
      { amount, date: new Date().toISOString() }
    ]);
  };

  return (
    <div>
      <p>Balance: {balance} TSH</p>
      <button onClick={() => addTransaction(1000)}>Add 1000 TSH</button>
    </div>
  );
}
```

### Advanced: Functional Updates

```tsx
const [cart, setCart] = useLocalStorage('cart', []);

// Use functional update (like useState)
setCart(prev => [...prev, newItem]);

// Or direct value
setCart([...cart, newItem]);
```

---

## 2. Using `StorageUtil` (Non-React Code)

Use this for utility functions, services, or non-component code.

### Setting Values

```tsx
import { StorageUtil } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

// Simple value
StorageUtil.setItem(STORAGE_KEYS.THEME_MODE, 'dark');

// Object
StorageUtil.setItem(STORAGE_KEYS.USER_PROFILE, {
  id: '123',
  name: 'John',
  email: 'john@example.com',
});

// Array
StorageUtil.setItem(STORAGE_KEYS.FAVORITES, ['slip1', 'slip2', 'slip3']);
```

### Getting Values

```tsx
// Get with default value
const theme = StorageUtil.getItem(STORAGE_KEYS.THEME_MODE, 'light');

// Get object
const profile = StorageUtil.getItem(STORAGE_KEYS.USER_PROFILE, null);

// Get array
const favorites = StorageUtil.getItem(STORAGE_KEYS.FAVORITES, []);
```

### Removing & Clearing

```tsx
// Remove specific key
StorageUtil.removeItem(STORAGE_KEYS.DRAFT_SLIP);

// Clear all storage
StorageUtil.clear();

// Check if key exists
if (StorageUtil.hasKey(STORAGE_KEYS.AUTH_TOKEN)) {
  console.log('User is authenticated');
}

// Get all keys
const allKeys = StorageUtil.getAllKeys();
console.log(allKeys);
```

---

## 3. Real-World Examples

### Example 1: User Preferences

```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export function SettingsPage() {
  const [preferences, setPreferences] = useLocalStorage(
    STORAGE_KEYS.USER_PREFERENCES,
    {
      notifications: true,
      emailUpdates: false,
      language: 'en',
      currency: 'TSH',
    }
  );

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={preferences.notifications}
          onChange={(e) => updatePreference('notifications', e.target.checked)}
        />
        Enable Notifications
      </label>
    </div>
  );
}
```

### Example 2: Shopping Cart

```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export function ShoppingCart() {
  const [cart, setCart] = useLocalStorage(STORAGE_KEYS.PURCHASED_SLIPS, []);

  const addToCart = (slip: any) => {
    setCart(prev => [...prev, slip]);
  };

  const removeFromCart = (slipId: string) => {
    setCart(prev => prev.filter(item => item.id !== slipId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div>
      <p>Items in cart: {cart.length}</p>
      <button onClick={() => addToCart({ id: '1', name: 'Slip 1' })}>
        Add Item
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
```

### Example 3: Form Draft Saving

```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { useEffect } from 'react';

export function CreateSlipForm() {
  const [formData, setFormData] = useLocalStorage(STORAGE_KEYS.DRAFT_SLIP, {
    title: '',
    description: '',
    odds: [],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Submit form
    await submitSlip(formData);
    // Clear draft after successful submission
    setFormData({ title: '', description: '', odds: [] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Slip Title"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Example 4: Search History

```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export function SearchComponent() {
  const [searchHistory, setSearchHistory] = useLocalStorage(
    STORAGE_KEYS.SEARCH_HISTORY,
    []
  );

  const handleSearch = (query: string) => {
    // Add to history (keep last 10 searches)
    setSearchHistory(prev => {
      const updated = [query, ...prev.filter(item => item !== query)];
      return updated.slice(0, 10);
    });
    // Perform search...
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      <div>
        <h3>Recent Searches:</h3>
        {searchHistory.map((query, idx) => (
          <button key={idx} onClick={() => handleSearch(query)}>
            {query}
          </button>
        ))}
        <button onClick={clearHistory}>Clear History</button>
      </div>
    </div>
  );
}
```

---

## 4. Storage Keys Reference

### Authentication
- `AUTH_USER` - Logged-in user object
- `AUTH_TOKEN` - JWT or session token
- `AUTH_REFRESH_TOKEN` - Refresh token for re-authentication

### User Preferences
- `THEME_MODE` - 'light' or 'dark'
- `LANGUAGE` - Language preference
- `SIDEBAR_STATE` - Sidebar expanded/collapsed state

### Wallet & Finance
- `WALLET_BALANCE` - User's wallet balance
- `TRANSACTION_HISTORY` - Array of transactions
- `PAYMENT_METHODS` - Saved payment methods
- `WITHDRAWAL_HISTORY` - Withdrawal records

### Betting Data
- `PURCHASED_SLIPS` - User's purchased slips
- `SLIP_HISTORY` - Historical slip data
- `FAVORITES` - Favorited slips
- `WATCHLIST` - Watched slips

### Referral Data
- `REFERRAL_CODE` - User's referral code
- `REFERRAL_HISTORY` - Referral records
- `REFERRAL_EARNINGS` - Earnings from referrals

### Tipster Data
- `CREATED_SLIPS` - Slips created by tipster
- `TIPSTER_STATS` - Tipster statistics
- `BRAINSCORE` - Brain score value

---

## 5. Best Practices

### ✅ DO:
- Use `STORAGE_KEYS` constants to avoid typos
- Provide default values when using `useLocalStorage`
- Use `StorageUtil` for non-component code
- Clear sensitive data (tokens, passwords) on logout
- Validate data when retrieving from storage
- Use functional updates for complex state changes

### ❌ DON'T:
- Store sensitive passwords or API keys
- Store very large objects (localStorage has ~5-10MB limit)
- Forget to handle errors (already done in utilities)
- Use hardcoded strings instead of `STORAGE_KEYS`
- Store data without serialization (use the utilities)

---

## 6. Clearing Storage on Logout

Update your `AuthContext.tsx`:

```tsx
const logout = () => {
  setUser(null);
  // Clear auth-related storage
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
  
  // Optionally clear user-specific data
  localStorage.removeItem(STORAGE_KEYS.WALLET_BALANCE);
  localStorage.removeItem(STORAGE_KEYS.TRANSACTION_HISTORY);
};
```

---

## 7. Debugging

### View all stored data in browser console:

```javascript
// Get all localStorage
Object.keys(localStorage).forEach(key => {
  console.log(key, JSON.parse(localStorage.getItem(key)));
});

// Clear all storage
localStorage.clear();
```

---

## Summary

You now have a complete localStorage system with:
- ✅ React hook for component state
- ✅ Utility functions for non-React code
- ✅ Centralized key management
- ✅ Type-safe storage
- ✅ Error handling
- ✅ Easy debugging
