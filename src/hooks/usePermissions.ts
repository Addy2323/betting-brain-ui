import { useAuth } from '@/context/AuthContext';
import { 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions, 
  getPermissions,
  canAccessFeature,
  Permission 
} from '@/lib/permissions';

export const usePermissions = () => {
  const { user } = useAuth();

  if (!user) {
    return {
      hasPermission: () => false,
      hasAnyPermission: () => false,
      hasAllPermissions: () => false,
      getPermissions: () => [],
      canAccessFeature: () => false,
    };
  }

  return {
    hasPermission: (permission: Permission) => hasPermission(user.role, permission),
    hasAnyPermission: (permissions: Permission[]) => hasAnyPermission(user.role, permissions),
    hasAllPermissions: (permissions: Permission[]) => hasAllPermissions(user.role, permissions),
    getPermissions: () => getPermissions(user.role),
    canAccessFeature: (feature: string) => canAccessFeature(user.role, feature),
  };
};
