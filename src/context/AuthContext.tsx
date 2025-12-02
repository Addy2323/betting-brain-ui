import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageUtil } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { DEFAULT_STATS, DASHBOARD_METRICS, WALLET_CONFIG, REFERRAL_CONFIG } from '@/config/mockData';
import { showSuccessAlert, showErrorAlert, showWarningAlert } from '@/lib/sweetalert';
import { seedDefaultUsers, areDefaultUsersSeeded } from '@/lib/seedUsers';

export type UserRole = 'user' | 'tipster' | 'admin' | 'super_admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
}

export interface RegisteredUser extends User {
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize default values for new users
const initializeUserDefaults = (userId: string, role: UserRole) => {
  // Clear all old finance data first
  StorageUtil.removeItem('financeTotalRevenue');
  StorageUtil.removeItem('financeMonthlyRevenue');
  StorageUtil.removeItem('financePendingPayouts');
  StorageUtil.removeItem('financePlatformFee');
  StorageUtil.removeItem('financeTab');
  StorageUtil.removeItem('tipsterApplications');
  StorageUtil.removeItem('tipsterApprovedCount');
  StorageUtil.removeItem('tipsterRejectedCount');

  // Initialize wallet
  StorageUtil.setItem(STORAGE_KEYS.WALLET_BALANCE, WALLET_CONFIG.defaultBalance);
  StorageUtil.setItem(STORAGE_KEYS.TRANSACTION_HISTORY, []);

  // Initialize user stats
  StorageUtil.setItem('userPurchasedSlips', DEFAULT_STATS.purchasedSlips);
  StorageUtil.setItem('userWinRate', DEFAULT_STATS.winRate);
  StorageUtil.setItem('userTotalProfit', DEFAULT_STATS.totalProfit);
  StorageUtil.setItem(STORAGE_KEYS.REFERRAL_HISTORY, REFERRAL_CONFIG.defaultReferrals);

  // Initialize referral data
  StorageUtil.setItem(STORAGE_KEYS.REFERRAL_CODE, REFERRAL_CONFIG.defaultCode);
  StorageUtil.setItem(STORAGE_KEYS.REFERRAL_EARNINGS, REFERRAL_CONFIG.defaultEarnings);

  // Initialize favorites and drafts
  StorageUtil.setItem(STORAGE_KEYS.FAVORITES, []);
  StorageUtil.setItem(STORAGE_KEYS.DRAFT_SLIP, null);
  StorageUtil.setItem(STORAGE_KEYS.PURCHASED_SLIPS, []);

  // Initialize role-specific defaults
  if (role === 'admin') {
    StorageUtil.setItem('adminTotalUsers', DASHBOARD_METRICS.admin.totalUsers);
    StorageUtil.setItem('adminPendingVerifications', DASHBOARD_METRICS.admin.pendingVerifications);
    StorageUtil.setItem('adminPlatformRevenue', DASHBOARD_METRICS.admin.platformRevenue);
    StorageUtil.setItem('adminOpenDisputes', DASHBOARD_METRICS.admin.openDisputes);
  } else if (role === 'super_admin') {
    StorageUtil.setItem('superAdminTotalUsers', DASHBOARD_METRICS.superAdmin.totalUsers);
    StorageUtil.setItem('superAdminSystemUptime', DASHBOARD_METRICS.superAdmin.systemUptime);
    StorageUtil.setItem('superAdminTotalRevenue', DASHBOARD_METRICS.superAdmin.totalRevenue);
    StorageUtil.setItem('superAdminSecurityAlerts', DASHBOARD_METRICS.superAdmin.securityAlerts);
    StorageUtil.setItem('superAdminRegularUsers', DASHBOARD_METRICS.superAdmin.regularUsers);
    StorageUtil.setItem('superAdminTipsters', DASHBOARD_METRICS.superAdmin.tipsters);
    StorageUtil.setItem('superAdminAdmins', DASHBOARD_METRICS.superAdmin.admins);
    StorageUtil.setItem('superAdminSuperAdmins', DASHBOARD_METRICS.superAdmin.superAdmins);
  } else if (role === 'tipster') {
    StorageUtil.setItem('tipsterTotalRevenue', DASHBOARD_METRICS.tipster.totalRevenue);
    StorageUtil.setItem('tipsterSlipsCreated', DASHBOARD_METRICS.tipster.slipsCreated);
    StorageUtil.setItem('tipsterWinRate', DASHBOARD_METRICS.tipster.winRate);
    StorageUtil.setItem('tipsterFollowers', DASHBOARD_METRICS.tipster.followers);
  } else if (role === 'user') {
    StorageUtil.setItem('userAccountBalance', DASHBOARD_METRICS.user.accountBalance);
    StorageUtil.setItem('userSlipsPurchased', DASHBOARD_METRICS.user.slipsPurchased);
    StorageUtil.setItem('userWinRate', DASHBOARD_METRICS.user.winRate);
    StorageUtil.setItem('userReferralBonus', DASHBOARD_METRICS.user.referralBonus);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      // Seed default users if not already done
      if (!areDefaultUsersSeeded()) {
        seedDefaultUsers();
      }

      const storedUser = StorageUtil.getItem<User>(STORAGE_KEYS.AUTH_USER, null);
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error);
      StorageUtil.removeItem(STORAGE_KEYS.AUTH_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get registered users from storage
      const registeredUsers = StorageUtil.getItem<RegisteredUser[]>(STORAGE_KEYS.REGISTERED_USERS, []);

      // Find user by email
      const existingUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!existingUser) {
        await showErrorAlert(
          'User Not Found',
          'No account found with this email. Please sign up first.'
        );
        throw new Error('User not found');
      }

      // Verify password
      if (existingUser.password !== password) {
        await showErrorAlert(
          'Invalid Password',
          'The password you entered is incorrect.'
        );
        throw new Error('Invalid password');
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = existingUser;

      setUser(userWithoutPassword);
      StorageUtil.setItem(STORAGE_KEYS.AUTH_USER, userWithoutPassword);
      StorageUtil.setItem(STORAGE_KEYS.AUTH_TOKEN, `token_${Date.now()}`);

      // Initialize default values for login
      initializeUserDefaults(userWithoutPassword.id, role);

      // Success alert
      await showSuccessAlert(
        'Welcome Back!',
        `Logged in as ${userWithoutPassword.fullName}`
      );
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get existing registered users
      const registeredUsers = StorageUtil.getItem<RegisteredUser[]>(STORAGE_KEYS.REGISTERED_USERS, []);

      // Check if user already exists
      const existingUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        await showWarningAlert(
          'Account Already Exists',
          'An account with this email already exists. Please login instead.'
        );
        throw new Error('User already exists');
      }

      const newRegisteredUser: RegisteredUser = {
        id: `user_${Date.now()}`,
        email,
        fullName,
        role,
        password, // Store password (in real app, this would be hashed)
        createdAt: new Date().toISOString(),
      };

      // Add new user to registered users list
      registeredUsers.push(newRegisteredUser);
      StorageUtil.setItem(STORAGE_KEYS.REGISTERED_USERS, registeredUsers);

      // Create user object without password
      const { password: _, ...userWithoutPassword } = newRegisteredUser;

      setUser(userWithoutPassword);
      StorageUtil.setItem(STORAGE_KEYS.AUTH_USER, userWithoutPassword);
      StorageUtil.setItem(STORAGE_KEYS.AUTH_TOKEN, `token_${Date.now()}`);

      // Initialize default values for new signup
      initializeUserDefaults(userWithoutPassword.id, role);

      // Success alert
      await showSuccessAlert(
        'Account Created!',
        `Welcome to Betting Brain, ${fullName}!`
      );
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear auth data
    StorageUtil.removeItem(STORAGE_KEYS.AUTH_USER);
    StorageUtil.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    StorageUtil.removeItem(STORAGE_KEYS.AUTH_REFRESH_TOKEN);

    // Clear user-specific data
    StorageUtil.removeItem(STORAGE_KEYS.WALLET_BALANCE);
    StorageUtil.removeItem(STORAGE_KEYS.TRANSACTION_HISTORY);
    StorageUtil.removeItem(STORAGE_KEYS.PURCHASED_SLIPS);
    StorageUtil.removeItem(STORAGE_KEYS.DRAFT_SLIP);
    StorageUtil.removeItem(STORAGE_KEYS.FAVORITES);
    StorageUtil.removeItem(STORAGE_KEYS.REFERRAL_CODE);
    StorageUtil.removeItem(STORAGE_KEYS.REFERRAL_HISTORY);
    StorageUtil.removeItem(STORAGE_KEYS.REFERRAL_EARNINGS);

    // Clear admin/finance data
    StorageUtil.removeItem('financeTotalRevenue');
    StorageUtil.removeItem('financeMonthlyRevenue');
    StorageUtil.removeItem('financePendingPayouts');
    StorageUtil.removeItem('financePlatformFee');
    StorageUtil.removeItem('financeTab');
  };

  const updateUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      StorageUtil.setItem(STORAGE_KEYS.AUTH_USER, updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
