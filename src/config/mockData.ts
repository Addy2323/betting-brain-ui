/**
 * Mock Data Configuration
 * All hardcoded data is centralized here for easy management
 * This data is loaded from localStorage when available
 */

export const MOCK_DATA = {
  // Trending Slips
  trendingSlips: [
    {
      id: '1',
      tipsterName: 'KingBet254',
      tipsterAvatar: '/placeholder.svg',
      picks: 5,
      totalOdds: 23.5,
      price: 15,
      league: 'Premier League',
      risk: 'medium' as const,
      winStreak: 7,
      watching: 234,
      verified: true,
    },
    {
      id: '2',
      tipsterName: 'NairobiTips',
      tipsterAvatar: '/placeholder.svg',
      picks: 3,
      totalOdds: 8.2,
      price: 8,
      league: 'La Liga',
      risk: 'low' as const,
      winStreak: 12,
      watching: 456,
      verified: true,
    },
    {
      id: '3',
      tipsterName: 'AccaMaster',
      tipsterAvatar: '/placeholder.svg',
      picks: 8,
      totalOdds: 156.4,
      price: 25,
      league: 'Serie A',
      risk: 'high' as const,
      winStreak: 3,
      watching: 789,
      verified: false,
    },
    {
      id: '4',
      tipsterName: 'SafeBets_KE',
      tipsterAvatar: '/placeholder.svg',
      picks: 4,
      totalOdds: 12.8,
      price: 10,
      league: 'Bundesliga',
      risk: 'low' as const,
      winStreak: 15,
      watching: 567,
      verified: true,
    },
  ],

  // Purchased Slips
  wonSlips: [
    {
      id: '1',
      tipsterName: 'KingBet254',
      tipsterAvatar: '/placeholder.svg',
      picks: 5,
      totalOdds: 23.5,
      price: 15,
      league: 'Premier League',
      risk: 'medium' as const,
      winStreak: 7,
      watching: 234,
      verified: true,
      isPurchased: true,
    },
  ],

  pendingSlips: [
    {
      id: '2',
      tipsterName: 'SafeBets_KE',
      tipsterAvatar: '/placeholder.svg',
      picks: 4,
      totalOdds: 12.8,
      price: 10,
      league: 'Bundesliga',
      risk: 'low' as const,
      winStreak: 15,
      watching: 567,
      verified: true,
      isPurchased: true,
    },
  ],

  lostSlips: [] as any[],

  // Withdrawals
  withdrawals: [
    {
      id: '1',
      tipsterName: 'KingBet254',
      avatar: '/placeholder.svg',
      amount: 450,
      method: 'M-Pesa',
      phone: '+254712345678',
      requestDate: '2024-01-15 14:30',
      status: 'pending' as const,
    },
    {
      id: '2',
      tipsterName: 'SafeBets_KE',
      avatar: '/placeholder.svg',
      amount: 280,
      method: 'Bank Transfer',
      accountNumber: '****5678',
      requestDate: '2024-01-15 12:15',
      status: 'pending' as const,
    },
  ],

  // Tipster Applications
  tipsterApplications: [
    {
      id: '1',
      name: 'KingBet254',
      avatar: '/placeholder.svg',
      email: 'kingbet@example.com',
      slipsSubmitted: 15,
      winRate: 73,
      avgOdds: 12.5,
      status: 'pending' as const,
      appliedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'AccaPro',
      avatar: '/placeholder.svg',
      email: 'acca@example.com',
      slipsSubmitted: 20,
      winRate: 65,
      avgOdds: 25.3,
      status: 'pending' as const,
      appliedDate: '2024-01-14',
    },
  ],

  // Free Daily Brain Carousel
  freeBrainSlides: [
    {
      id: '1',
      tipsterName: 'Sarah Johnson',
      winStreak: 12,
      accuracy: 94,
      dropTime: '2h 14m',
      availableTime: '11:00 AM EAT',
      description: 'Today\'s Free Brain from Elite Tipster',
      image: '/image1.png',
      gradientFrom: 'from-purple-600',
      gradientTo: 'to-purple-800',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    },
    {
      id: '2',
      tipsterName: 'Alex Martinez',
      winStreak: 8,
      accuracy: 89,
      dropTime: '1h 45m',
      availableTime: '10:30 AM EAT',
      description: 'Premium Betting Tips - Limited Time Offer',
      image: '/image2.png',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-blue-800',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    },
    {
      id: '3',
      tipsterName: 'Mike Chen',
      winStreak: 15,
      accuracy: 92,
      dropTime: '3h 30m',
      availableTime: '12:15 PM EAT',
      description: 'Exclusive Predictions from Top Tipsters',
      image: '/image3.png',
      gradientFrom: 'from-orange-600',
      gradientTo: 'to-orange-800',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
    },
  ],

  // Referral Tiers
  referralTiers: [
    {
      name: 'Bronze',
      required: 3,
      reward: 'TSH 10,000 bonus',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20',
      borderColor: 'border-orange-400/50',
    },
    {
      name: 'Silver',
      required: 10,
      reward: 'TSH 30,000 bonus + 5% commission',
      color: 'text-gray-300',
      bgColor: 'bg-gray-300/20',
      borderColor: 'border-gray-300/50',
    },
    {
      name: 'Gold',
      required: 25,
      reward: 'TSH 100,000 bonus + 10% commission',
      color: 'text-gold',
      bgColor: 'bg-gold/20',
      borderColor: 'border-gold/50',
    },
    {
      name: 'Diamond',
      required: 100,
      reward: 'TSH 500,000 bonus + 15% lifetime commission',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      borderColor: 'border-primary/50',
    },
  ],

  // Index Page Trending Slips
  indexTrendingSlips: [
    {
      tipsterName: 'Alex Martinez',
      tipsterAvatar: undefined,
      picks: 5,
      totalOdds: 12.5,
      price: 9.99,
      league: 'Premier League',
      risk: 'medium' as const,
      winStreak: 7,
      watching: 234,
      verified: true,
    },
    {
      tipsterName: 'Sarah Johnson',
      tipsterAvatar: undefined,
      picks: 3,
      totalOdds: 8.2,
      price: 4.99,
      league: 'La Liga',
      risk: 'low' as const,
      winStreak: 12,
      watching: 189,
      verified: true,
    },
    {
      tipsterName: 'Mike Chen',
      tipsterAvatar: undefined,
      picks: 7,
      totalOdds: 24.8,
      price: 14.99,
      league: 'Champions League',
      risk: 'high' as const,
      winStreak: 4,
      watching: 412,
      verified: true,
    },
  ],
};

/**
 * Default Values for Statistics
 * These are used as fallback values when localStorage is empty
 */
export const DEFAULT_STATS = {
  purchasedSlips: 24,
  winRate: 62.5,
  totalProfit: 187500,
  referrals: 7,
  totalRevenue: 45230000,
  monthlyRevenue: 12890000,
  pendingPayouts: 8450000,
  platformFee: 5670000,
  approvedTipsters: 24,
  rejectedTipsters: 8,
  totalTipsters: 32,
  withdrawalLimit: 500,
  currentWithdrawn: 120,
};

/**
 * Withdrawal Limits
 */
export const WITHDRAWAL_CONFIG = {
  monthlyLimit: 500, // in thousands (500,000 TSH)
  currentWithdrawn: 120, // in thousands
  withdrawalFee: 500, // TSH
  processingTime: '5-15 mins',
};

/**
 * Referral Configuration
 */
export const REFERRAL_CONFIG = {
  defaultCode: 'BRAIN247',
  defaultReferrals: 7,
  defaultEarnings: 0,
};

/**
 * Finance Configuration
 */
export const FINANCE_CONFIG = {
  slipSalesCount: 1234,
  slipSalesAmount: 38560000,
  subscriptionCount: 567,
  subscriptionAmount: 4250000,
  premiumUsersCount: 89,
  premiumAmount: 2420000,
  pendingRequests: 45,
  processedThisMonth: 345,
};

/**
 * Wallet Configuration
 */
export const WALLET_CONFIG = {
  defaultBalance: 247500, // TSH
  depositMethods: ['mpesa', 'airtel', 'bank', 'halopesa'],
  withdrawalMethods: ['mpesa', 'airtel', 'bank', 'halopesa'],
};

/**
 * Dashboard Metrics - Default Values
 */
export const DASHBOARD_METRICS = {
  admin: {
    totalUsers: 0,
    pendingVerifications: 0,
    platformRevenue: 0,
    openDisputes: 0,
    serverStatus: 'Healthy',
    databaseStatus: 'Operational',
  },
  superAdmin: {
    totalUsers: 0,
    systemUptime: 99.9,
    totalRevenue: 0,
    securityAlerts: 0,
    apiServerStatus: 'Operational',
    databaseClusterStatus: 'Healthy',
    cacheLayerStatus: 'Operational',
    regularUsers: 0,
    tipsters: 0,
    admins: 0,
    superAdmins: 1,
  },
  tipster: {
    totalRevenue: 0,
    slipsCreated: 0,
    winRate: 0,
    followers: 0,
  },
  user: {
    accountBalance: 0,
    slipsPurchased: 0,
    winRate: 0,
    referralBonus: 0,
  },
};
