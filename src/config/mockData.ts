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
      subscriberCount: 5300,
      picks: 5,
      totalOdds: 23.5,
      price: 15,
      risk: 'medium' as const,
      winStreak: 7,
      watching: 234,
      verified: true,
      bookmakers: ['betika', 'sportpesa', 'betway'],
      bookingCodes: {
        betika: 'BK12345',
        sportpesa: 'SP67890',
        betway: 'BW45678',
      },
      matches: [
        { id: '1', name: 'Arsenal vs Chelsea', options: 'Home Win @ 2.5' },
        { id: '2', name: 'Man United vs Liverpool', options: 'Over 2.5 Goals @ 1.8' },
        { id: '3', name: 'Bayern vs Dortmund', options: 'BTTS Yes @ 1.9' },
      ],
      startTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(), // 8 hours from now
    },
    {
      id: '2',
      tipsterName: 'NairobiTips',
      tipsterAvatar: '/placeholder.svg',
      subscriberCount: 8200,
      picks: 3,
      totalOdds: 8.2,
      price: 8,
      risk: 'low' as const,
      winStreak: 12,
      watching: 456,
      verified: true,
      bookmakers: ['betpawa', '1xbet'],
      bookingCodes: {
        betpawa: 'BP98765',
        '1xbet': '1X54321',
      },
      matches: [
        { id: '1', name: 'Real Madrid vs Barcelona', options: 'Draw @ 3.2' },
        { id: '2', name: 'Atletico vs Sevilla', options: 'Under 2.5 @ 1.7' },
      ],
      startTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
    },
    {
      id: '3',
      tipsterName: 'AccaMaster',
      tipsterAvatar: '/placeholder.svg',
      subscriberCount: 12500,
      picks: 8,
      totalOdds: 156.4,
      price: 25,
      risk: 'high' as const,
      winStreak: 3,
      watching: 789,
      verified: false,
      bookmakers: ['mozzart', 'betin', 'helabet'],
      bookingCodes: {
        mozzart: 'MZ11111',
        betin: 'BT22222',
        helabet: 'HL33333',
      },
      matches: [
        { id: '1', name: 'Juventus vs Inter', options: 'Home Win @ 2.1' },
        { id: '2', name: 'AC Milan vs Napoli', options: 'Over 3.5 @ 2.8' },
        { id: '3', name: 'Roma vs Lazio', options: 'BTTS @ 1.9' },
        { id: '4', name: 'Atalanta vs Fiorentina', options: 'Away Win @ 3.5' },
      ],
      startTime: new Date(Date.now()).toISOString(),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
    },
    {
      id: '4',
      tipsterName: 'SafeBets_KE',
      tipsterAvatar: '/placeholder.svg',
      subscriberCount: 6700,
      picks: 4,
      totalOdds: 12.8,
      price: 10,
      risk: 'low' as const,
      winStreak: 15,
      watching: 567,
      verified: true,
      bookmakers: ['sportybet', 'paripesa'],
      bookingCodes: {
        sportybet: 'SB77777',
        paripesa: 'PP88888',
      },
      matches: [
        { id: '1', name: 'PSG vs Lyon', options: 'Home Win @ 1.6' },
        { id: '2', name: 'Monaco vs Marseille', options: 'Over 2.5 @ 2.1' },
        { id: '3', name: 'Lille vs Nice', options: 'BTTS Yes @ 1.8' },
      ],
      startTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 10).toISOString(),
    },
  ],

  // Purchased Slips
  wonSlips: [
    {
      id: '1',
      tipsterName: 'KingBet254',
      tipsterAvatar: '/placeholder.svg',
      subscriberCount: 5300,
      picks: 5,
      totalOdds: 23.5,
      price: 15,
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
      subscriberCount: 6700,
      picks: 4,
      totalOdds: 12.8,
      price: 10,
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
      subscriberCount: 3400,
      picks: 5,
      totalOdds: 12.5,
      price: 9.99,
      risk: 'medium' as const,
      winStreak: 7,
      watching: 234,
      verified: true,
    },
    {
      tipsterName: 'Sarah Johnson',
      tipsterAvatar: undefined,
      subscriberCount: 7800,
      picks: 3,
      totalOdds: 8.2,
      price: 4.99,
      risk: 'low' as const,
      winStreak: 12,
      watching: 189,
      verified: true,
    },
    {
      tipsterName: 'Mike Chen',
      tipsterAvatar: undefined,
      subscriberCount: 9200,
      picks: 7,
      totalOdds: 24.8,
      price: 14.99,
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
