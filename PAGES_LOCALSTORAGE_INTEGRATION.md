# Pages Local Storage Integration Guide

This document outlines how localStorage has been integrated into all major pages of the BetBrain application.

---

## Overview

All pages now use the `useLocalStorage` hook and `STORAGE_KEYS` constants to persist user data. This ensures data persists across page refreshes and browser sessions.

---

## Pages Integration Summary

### 1. **Wallet.tsx** ✅
**Purpose:** Manage user wallet, balance, and transactions

**Data Stored:**
- `WALLET_BALANCE` - Current wallet balance (default: 247,500 TSH)
- `TRANSACTION_HISTORY` - Array of all transactions (deposits, withdrawals, purchases)

**Implementation:**
```tsx
const [balance, setBalance] = useLocalStorage(STORAGE_KEYS.WALLET_BALANCE, 247500);
const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
  STORAGE_KEYS.TRANSACTION_HISTORY,
  [/* initial transactions */]
);
```

**Features:**
- Balance persists across sessions
- Transaction history is maintained
- Add new transactions to update balance

**Example Usage:**
```tsx
// Add a deposit
setBalance(prev => prev + 50000);
setTransactions(prev => [...prev, {
  id: Date.now(),
  type: 'deposit',
  amount: 50000,
  status: 'completed',
  date: new Date().toISOString(),
  method: 'M-Pesa'
}]);
```

---

### 2. **Trending.tsx** ✅
**Purpose:** Display trending slips with filters and search

**Data Stored:**
- `trendingSearch` - Search query
- `trendingLeague` - Selected league filter
- `trendingRisk` - Selected risk level filter
- `trendingSort` - Sort preference
- `FAVORITES` - Favorited slip IDs

**Implementation:**
```tsx
const [searchQuery, setSearchQuery] = useLocalStorage('trendingSearch', '');
const [selectedLeague, setSelectedLeague] = useLocalStorage('trendingLeague', 'all');
const [selectedRisk, setSelectedRisk] = useLocalStorage('trendingRisk', 'all');
const [sortBy, setSortBy] = useLocalStorage('trendingSort', 'watching');
const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);
```

**Features:**
- Filter preferences persist
- Search history maintained
- Favorites list saved
- User returns to same filtered view

---

### 3. **PurchasedSlips.tsx** ✅
**Purpose:** Display user's purchased betting slips

**Data Stored:**
- `PURCHASED_SLIPS` - Array of all purchased slips with status (won/lost/pending)

**Implementation:**
```tsx
const [slipHistory, setSlipHistory] = useLocalStorage(STORAGE_KEYS.PURCHASED_SLIPS, [
  ...mockWonSlips,
  ...mockPendingSlips,
  ...mockLostSlips,
]);
```

**Features:**
- Slip history persists
- Status tracking (won/lost/pending)
- Statistics calculated from stored data

**Example Usage:**
```tsx
// Add a new purchased slip
setSlipHistory(prev => [...prev, {
  id: Date.now().toString(),
  tipsterName: 'John Doe',
  picks: 5,
  totalOdds: 12.5,
  price: 10,
  league: 'Premier League',
  risk: 'medium',
  winStreak: 7,
  watching: 234,
  verified: true,
  isPurchased: true,
}]);
```

---

### 4. **CreateSlip.tsx** ✅
**Purpose:** Create and save betting slips as drafts

**Data Stored:**
- `DRAFT_SLIP` - Complete draft slip with all form data and picks

**Implementation:**
```tsx
const [draftSlip, setDraftSlip] = useLocalStorage<DraftSlip>(STORAGE_KEYS.DRAFT_SLIP, {
  league: '',
  risk: '',
  price: '',
  bookmaker: '',
  description: '',
  picks: [{ id: '1', match: '', pick: '', odds: '' }],
});
```

**Features:**
- Auto-save draft functionality
- "Save as Draft" button persists form data
- Draft cleared after successful submission
- Users can return and continue editing

**Example Usage:**
```tsx
// Save draft
const handleSaveDraft = () => {
  setDraftSlip({
    league: selectedLeague,
    risk: selectedRisk,
    price: formPrice,
    bookmaker: selectedBookmaker,
    description: formDescription,
    picks,
  });
  toast.success('Draft saved!');
};
```

---

### 5. **Referrals.tsx** ✅
**Purpose:** Manage referral program and track earnings

**Data Stored:**
- `REFERRAL_CODE` - User's unique referral code
- `REFERRAL_HISTORY` - Total number of referrals
- `REFERRAL_EARNINGS` - Total earnings from referrals

**Implementation:**
```tsx
const [referralCode, setReferralCode] = useLocalStorage(STORAGE_KEYS.REFERRAL_CODE, 'BRAIN247');
const [totalReferrals, setTotalReferrals] = useLocalStorage(STORAGE_KEYS.REFERRAL_HISTORY, 7);
const [referralEarnings, setReferralEarnings] = useLocalStorage(STORAGE_KEYS.REFERRAL_EARNINGS, 0);
```

**Features:**
- Referral code persists
- Referral count tracked
- Earnings calculated and stored
- Tier progress saved

**Example Usage:**
```tsx
// Add a new referral
setTotalReferrals(prev => prev + 1);
setReferralEarnings(prev => prev + 5000); // Add 5000 TSH commission
```

---

### 6. **Index.tsx** ✅
**Purpose:** Dashboard with user activity statistics

**Data Stored:**
- `userPurchasedSlips` - Number of purchased slips
- `userWinRate` - Win rate percentage
- `userTotalProfit` - Total profit in TSH
- `REFERRAL_HISTORY` - Number of referrals

**Implementation:**
```tsx
const [purchasedSlips, setPurchasedSlips] = useLocalStorage('userPurchasedSlips', 24);
const [winRate, setWinRate] = useLocalStorage('userWinRate', 62.5);
const [totalProfit, setTotalProfit] = useLocalStorage('userTotalProfit', 187500);
const [referrals, setReferrals] = useLocalStorage(STORAGE_KEYS.REFERRAL_HISTORY, 7);
```

**Features:**
- User stats persist across sessions
- Real-time updates to dashboard
- Stats sync with other pages

---

## Storage Keys Reference

```typescript
// Authentication
AUTH_USER: 'user'
AUTH_TOKEN: 'authToken'

// Wallet & Finance
WALLET_BALANCE: 'walletBalance'
TRANSACTION_HISTORY: 'transactionHistory'

// Betting Data
PURCHASED_SLIPS: 'purchasedSlips'
FAVORITES: 'favorites'
DRAFT_SLIP: 'draftSlip'

// Referral Data
REFERRAL_CODE: 'referralCode'
REFERRAL_HISTORY: 'referralHistory'
REFERRAL_EARNINGS: 'referralEarnings'
```

---

## Common Patterns

### Pattern 1: Simple State Persistence
```tsx
const [value, setValue] = useLocalStorage('key', defaultValue);
```

### Pattern 2: Complex Object Persistence
```tsx
const [data, setData] = useLocalStorage<ComplexType>('key', {
  field1: '',
  field2: 0,
  nested: { /* ... */ }
});
```

### Pattern 3: Array Manipulation
```tsx
// Add item
setArray(prev => [...prev, newItem]);

// Remove item
setArray(prev => prev.filter(item => item.id !== idToRemove));

// Update item
setArray(prev => prev.map(item => 
  item.id === idToUpdate ? { ...item, ...updates } : item
));
```

### Pattern 4: Functional Updates
```tsx
// Use functional update for complex logic
setBalance(prev => prev + amount);
setTransactions(prev => [...prev, newTransaction]);
```

---

## Data Flow Example

### Wallet Page Flow:
1. User opens Wallet page
2. `useLocalStorage` loads balance from localStorage
3. User deposits 50,000 TSH
4. `setBalance()` updates state AND localStorage
5. User refreshes page
6. Balance persists from localStorage
7. User navigates away and returns
8. Balance still persists

---

## Best Practices

### ✅ DO:
- Use `STORAGE_KEYS` constants for all keys
- Provide meaningful default values
- Update localStorage immediately with state
- Clear sensitive data on logout
- Use functional updates for complex changes
- Validate data when loading from storage

### ❌ DON'T:
- Use hardcoded strings for keys
- Store passwords or sensitive tokens
- Store very large objects (localStorage limit ~5-10MB)
- Forget to handle errors (already done in utilities)
- Mix storage patterns in same component

---

## Clearing Data on Logout

Update `AuthContext.tsx` logout function:

```tsx
const logout = () => {
  setUser(null);
  
  // Clear auth data
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  
  // Optionally clear user-specific data
  localStorage.removeItem(STORAGE_KEYS.WALLET_BALANCE);
  localStorage.removeItem(STORAGE_KEYS.TRANSACTION_HISTORY);
  localStorage.removeItem(STORAGE_KEYS.PURCHASED_SLIPS);
  localStorage.removeItem(STORAGE_KEYS.DRAFT_SLIP);
};
```

---

## Testing Local Storage

### Browser DevTools:
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Local Storage"
4. Select your domain
5. View all stored data

### Console Commands:
```javascript
// View all localStorage
Object.keys(localStorage).forEach(key => {
  console.log(key, JSON.parse(localStorage.getItem(key)));
});

// Clear specific key
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

---

## Future Enhancements

- [ ] Add data export/import functionality
- [ ] Implement localStorage compression for large datasets
- [ ] Add data sync with backend API
- [ ] Implement localStorage versioning for migrations
- [ ] Add localStorage quota monitoring
- [ ] Create localStorage backup system

---

## Troubleshooting

### Issue: Data not persisting
**Solution:** Check if localStorage is enabled in browser settings

### Issue: Old data showing
**Solution:** Clear localStorage in DevTools or call `localStorage.clear()`

### Issue: Storage quota exceeded
**Solution:** Remove unnecessary data or implement cleanup logic

### Issue: Data inconsistency
**Solution:** Ensure all updates use the same storage key and pattern

---

## Summary

All major pages now have localStorage integration:
- ✅ Wallet - Balance & Transactions
- ✅ Trending - Filters & Favorites
- ✅ PurchasedSlips - Slip History
- ✅ CreateSlip - Draft Saving
- ✅ Referrals - Referral Data
- ✅ Index - User Statistics

Users can now:
- Persist data across sessions
- Resume where they left off
- Save drafts automatically
- Maintain filter preferences
- Track their activity
