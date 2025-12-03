/**
 * Centralized storage keys for localStorage
 * Use these constants to avoid typos and maintain consistency
 */

export const STORAGE_KEYS = {
  // Authentication
  AUTH_USER: 'user',
  AUTH_TOKEN: 'authToken',
  AUTH_REFRESH_TOKEN: 'refreshToken',
  REGISTERED_USERS: 'registeredUsers',

  // User Preferences
  THEME_MODE: 'themeMode', // 'light' | 'dark'
  LANGUAGE: 'language',
  SIDEBAR_STATE: 'sidebarState', // 'expanded' | 'collapsed'

  // User Data
  USER_PROFILE: 'userProfile',
  USER_PREFERENCES: 'userPreferences',
  USER_SETTINGS: 'userSettings',

  // Wallet & Finance
  WALLET_BALANCE: 'walletBalance',
  TRANSACTION_HISTORY: 'transactionHistory',
  PAYMENT_METHODS: 'paymentMethods',
  WITHDRAWAL_HISTORY: 'withdrawalHistory',

  // Betting Data
  PURCHASED_SLIPS: 'purchasedSlips',
  SLIP_HISTORY: 'slipHistory',
  FAVORITES: 'favorites',
  WATCHLIST: 'watchlist',

  // Referral Data
  REFERRAL_CODE: 'referralCode',
  REFERRAL_HISTORY: 'referralHistory',
  REFERRAL_EARNINGS: 'referralEarnings',

  // Tipster Data
  CREATED_SLIPS: 'createdSlips',
  TIPSTER_SLIPS: 'tipsterSlips',
  TIPSTER_STATS: 'tipsterStats',
  BRAINSCORE: 'brainScore',

  // Cache & Temporary
  SEARCH_HISTORY: 'searchHistory',
  RECENT_SLIPS: 'recentSlips',
  DRAFT_SLIP: 'draftSlip',
  FORM_CACHE: 'formCache',

  // Admin Data
  ADMIN_FILTERS: 'adminFilters',
  ADMIN_PREFERENCES: 'adminPreferences',
  DISPUTE_FILTERS: 'disputeFilters',

  // UI State
  EXPANDED_SECTIONS: 'expandedSections',
  MODAL_STATE: 'modalState',
  NOTIFICATION_PREFERENCES: 'notificationPreferences',
} as const;

// Type for storage keys
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
