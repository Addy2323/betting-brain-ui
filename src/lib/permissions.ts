import { UserRole } from '@/context/AuthContext';

export type Permission = 
  | 'view_dashboard'
  | 'view_trending'
  | 'purchase_slips'
  | 'create_slips'
  | 'view_wallet'
  | 'withdraw_funds'
  | 'view_referrals'
  | 'verify_tipsters'
  | 'manage_finance'
  | 'resolve_disputes'
  | 'view_reports'
  | 'manage_users'
  | 'access_audit_log'
  | 'manage_system_settings'
  | 'view_proofchain';

// Define permissions for each role
const rolePermissions: Record<UserRole, Permission[]> = {
  user: [
    'view_dashboard',
    'view_trending',
    'purchase_slips',
    'view_wallet',
    'view_referrals',
  ],
  tipster: [
    'view_dashboard',
    'view_trending',
    'purchase_slips',
    'create_slips',
    'view_wallet',
    'withdraw_funds',
    'view_referrals',
  ],
  admin: [
    'view_dashboard',
    'view_trending',
    'purchase_slips',
    'create_slips',
    'view_wallet',
    'withdraw_funds',
    'view_referrals',
    'verify_tipsters',
    'manage_finance',
    'resolve_disputes',
    'view_reports',
    'manage_users',
  ],
  super_admin: [
    'view_dashboard',
    'view_trending',
    'purchase_slips',
    'create_slips',
    'view_wallet',
    'withdraw_funds',
    'view_referrals',
    'verify_tipsters',
    'manage_finance',
    'resolve_disputes',
    'view_reports',
    'manage_users',
    'access_audit_log',
    'manage_system_settings',
    'view_proofchain',
  ],
};

/**
 * Check if a user role has a specific permission
 */
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return rolePermissions[role]?.includes(permission) ?? false;
};

/**
 * Check if a user role has any of the specified permissions
 */
export const hasAnyPermission = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(role, permission));
};

/**
 * Check if a user role has all of the specified permissions
 */
export const hasAllPermissions = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(role, permission));
};

/**
 * Get all permissions for a role
 */
export const getPermissions = (role: UserRole): Permission[] => {
  return rolePermissions[role] ?? [];
};

/**
 * Check if a role can access a specific feature
 */
export const canAccessFeature = (role: UserRole, feature: string): boolean => {
  const featurePermissions: Record<string, Permission[]> = {
    'create-slip': ['create_slips'],
    'verify-tipsters': ['verify_tipsters'],
    'finance': ['manage_finance'],
    'withdrawals': ['withdraw_funds'],
    'disputes': ['resolve_disputes'],
    'reports': ['view_reports'],
    'audit-log': ['access_audit_log'],
    'settings': ['manage_system_settings'],
    'proofchain': ['view_proofchain'],
  };

  const requiredPermissions = featurePermissions[feature];
  if (!requiredPermissions) return true; // Allow access if feature has no specific permissions

  return hasAllPermissions(role, requiredPermissions);
};
