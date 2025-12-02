# Local Storage - Quick Reference Guide

## 🚀 Quick Start

### Import
```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
```

### Basic Usage
```tsx
const [value, setValue] = useLocalStorage('key', defaultValue);
```

### With Type Safety
```tsx
const [data, setData] = useLocalStorage<DataType>('key', defaultValue);
```

---

## 📝 Common Patterns

### Store Simple Value
```tsx
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### Store Object
```tsx
const [user, setUser] = useLocalStorage(STORAGE_KEYS.USER_PROFILE, {
  name: '',
  email: '',
});
```

### Store Array
```tsx
const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);
```

### Update Array
```tsx
// Add
setFavorites(prev => [...prev, newItem]);

// Remove
setFavorites(prev => prev.filter(item => item.id !== id));

// Update
setFavorites(prev => prev.map(item =>
  item.id === id ? { ...item, ...updates } : item
));
```

### Update Number
```tsx
setBalance(prev => prev + amount);
```

---

## 🔑 Storage Keys

### Wallet
```
WALLET_BALANCE
TRANSACTION_HISTORY
PAYMENT_METHODS
WITHDRAWAL_HISTORY
```

### Betting
```
PURCHASED_SLIPS
SLIP_HISTORY
FAVORITES
WATCHLIST
DRAFT_SLIP
```

### Referral
```
REFERRAL_CODE
REFERRAL_HISTORY
REFERRAL_EARNINGS
```

### Auth
```
AUTH_USER
AUTH_TOKEN
AUTH_REFRESH_TOKEN
```

---

## 🛠️ Non-React Usage

```tsx
import { StorageUtil } from '@/hooks/useLocalStorage';

// Set
StorageUtil.setItem('key', value);

// Get
const value = StorageUtil.getItem('key', defaultValue);

// Remove
StorageUtil.removeItem('key');

// Check exists
if (StorageUtil.hasKey('key')) { }

// Get all keys
const keys = StorageUtil.getAllKeys();

// Clear all
StorageUtil.clear();
```

---

## 📊 Pages Using localStorage

| Page | Data | Keys |
|------|------|------|
| Index | Stats | userPurchasedSlips, userWinRate, userTotalProfit |
| Wallet | Balance, Transactions | WALLET_BALANCE, TRANSACTION_HISTORY |
| Trending | Filters, Search | trendingSearch, trendingLeague, trendingRisk, FAVORITES |
| PurchasedSlips | Slip History | PURCHASED_SLIPS |
| CreateSlip | Draft | DRAFT_SLIP |
| Referrals | Referral Data | REFERRAL_CODE, REFERRAL_HISTORY, REFERRAL_EARNINGS |
| Finance | Metrics | financeTotalRevenue, financeMonthlyRevenue, etc |
| Withdrawals | Requests | WITHDRAWAL_HISTORY |
| VerifyTipsters | Applications | tipsterApplications, tipsterApprovedCount, etc |

---

## 🧪 Debug in Browser

### View All Data
```javascript
Object.keys(localStorage).forEach(key => {
  console.log(key, JSON.parse(localStorage.getItem(key)));
});
```

### View Specific Key
```javascript
console.log(JSON.parse(localStorage.getItem('key')));
```

### Clear Specific Key
```javascript
localStorage.removeItem('key');
```

### Clear All
```javascript
localStorage.clear();
```

### DevTools
1. F12 → Application → Local Storage → Select domain

---

## ✅ Best Practices

- ✅ Use STORAGE_KEYS constants
- ✅ Provide default values
- ✅ Use functional updates for complex changes
- ✅ Clear sensitive data on logout
- ✅ Validate data when loading
- ✅ Handle errors gracefully

---

## ❌ Avoid

- ❌ Hardcoded string keys
- ❌ Storing passwords
- ❌ Very large objects (>5MB)
- ❌ Forgetting error handling
- ❌ Mixing patterns

---

## 📚 Full Documentation

- `LOCAL_STORAGE_GUIDE.md` - Complete guide
- `PAGES_LOCALSTORAGE_INTEGRATION.md` - Page details
- `LOCALSTORAGE_IMPLEMENTATION_SUMMARY.md` - Overview
- `COMPLETE_LOCALSTORAGE_STATUS.md` - Status

---

## 🎯 Real Examples

### Wallet Page
```tsx
const [balance, setBalance] = useLocalStorage(STORAGE_KEYS.WALLET_BALANCE, 0);
const [transactions, setTransactions] = useLocalStorage(STORAGE_KEYS.TRANSACTION_HISTORY, []);

// Add transaction
setTransactions(prev => [...prev, newTransaction]);
setBalance(prev => prev + amount);
```

### Trending Page
```tsx
const [searchQuery, setSearchQuery] = useLocalStorage('trendingSearch', '');
const [selectedLeague, setSelectedLeague] = useLocalStorage('trendingLeague', 'all');
const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);
```

### CreateSlip Page
```tsx
const [draftSlip, setDraftSlip] = useLocalStorage(STORAGE_KEYS.DRAFT_SLIP, {
  league: '',
  risk: '',
  picks: [],
});

// Save draft
const handleSaveDraft = () => {
  setDraftSlip(currentDraft);
};
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Data not persisting | Check if localStorage enabled |
| Old data showing | Clear localStorage in DevTools |
| Storage quota exceeded | Remove unnecessary data |
| Data inconsistency | Use same storage key |

---

## 📞 Support

- Check `src/hooks/useLocalStorage.ts` for implementation
- Check `src/lib/storageKeys.ts` for all keys
- Review page files for examples
- See documentation files for details

---

**Status: ✅ Ready to Use**
