import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Permission } from '@/lib/permissions';

interface PermissionGuardProps {
  children: ReactNode;
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

/**
 * Component to conditionally render content based on user permissions
 * 
 * @example
 * // Single permission
 * <PermissionGuard permission="create_slips">
 *   <CreateSlipButton />
 * </PermissionGuard>
 * 
 * @example
 * // Multiple permissions (any)
 * <PermissionGuard permissions={['verify_tipsters', 'manage_users']}>
 *   <ManagementPanel />
 * </PermissionGuard>
 * 
 * @example
 * // Multiple permissions (all)
 * <PermissionGuard permissions={['manage_finance', 'view_reports']} requireAll>
 *   <FinanceReports />
 * </PermissionGuard>
 */
export const PermissionGuard = ({
  children,
  permission,
  permissions,
  requireAll = false,
  fallback = null,
}: PermissionGuardProps) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions) 
      : hasAnyPermission(permissions);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
