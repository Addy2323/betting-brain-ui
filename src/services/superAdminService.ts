/**
 * Super Admin Service - CRUD Operations
 * Handles all super admin operations including user management and system settings
 */

import { StorageUtil } from '@/hooks/useLocalStorage';

export interface SystemUser {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'tipster' | 'admin' | 'super_admin';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export interface SystemSettings {
  id: string;
  platformName: string;
  maintenanceMode: boolean;
  maxWithdrawalLimit: number;
  commissionRate: number;
  minDepositAmount: number;
  maxDepositAmount: number;
  updatedAt: string;
  updatedBy: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  targetId: string;
  targetType: 'user' | 'dispute' | 'verification' | 'settings';
  details: string;
  timestamp: string;
  ipAddress?: string;
}

class SuperAdminService {
  // USER MANAGEMENT CRUD
  createUser(user: Omit<SystemUser, 'id' | 'createdAt'>): SystemUser {
    const newUser: SystemUser = {
      ...user,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const users = StorageUtil.getItem<SystemUser[]>('superAdminUsers', []);
    users.push(newUser);
    StorageUtil.setItem('superAdminUsers', users);
    
    return newUser;
  }

  getUsers(): SystemUser[] {
    return StorageUtil.getItem<SystemUser[]>('superAdminUsers', []);
  }

  getUserById(id: string): SystemUser | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  getUsersByRole(role: string): SystemUser[] {
    return this.getUsers().filter(u => u.role === role);
  }

  updateUser(id: string, updates: Partial<SystemUser>): SystemUser | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updates };
    StorageUtil.setItem('superAdminUsers', users);
    
    return users[index];
  }

  suspendUser(id: string): SystemUser | null {
    return this.updateUser(id, { status: 'suspended' });
  }

  activateUser(id: string): SystemUser | null {
    return this.updateUser(id, { status: 'active' });
  }

  deactivateUser(id: string): SystemUser | null {
    return this.updateUser(id, { status: 'inactive' });
  }

  deleteUser(id: string): boolean {
    const users = this.getUsers();
    const filtered = users.filter(u => u.id !== id);
    
    if (filtered.length === users.length) return false;
    
    StorageUtil.setItem('superAdminUsers', filtered);
    return true;
  }

  // SYSTEM SETTINGS CRUD
  getSystemSettings(): SystemSettings {
    return StorageUtil.getItem<SystemSettings>('systemSettings', {
      id: 'settings_default',
      platformName: 'BetBrain',
      maintenanceMode: false,
      maxWithdrawalLimit: 500000,
      commissionRate: 0.3,
      minDepositAmount: 1000,
      maxDepositAmount: 10000000,
      updatedAt: new Date().toISOString(),
      updatedBy: 'system',
    });
  }

  updateSystemSettings(settings: Partial<SystemSettings>, adminId: string): SystemSettings {
    const current = this.getSystemSettings();
    const updated: SystemSettings = {
      ...current,
      ...settings,
      updatedAt: new Date().toISOString(),
      updatedBy: adminId,
    };
    
    StorageUtil.setItem('systemSettings', updated);
    this.logAudit(adminId, 'UPDATE_SYSTEM_SETTINGS', 'settings_default', 'settings', 'System settings updated');
    
    return updated;
  }

  toggleMaintenanceMode(adminId: string): SystemSettings {
    const settings = this.getSystemSettings();
    return this.updateSystemSettings(
      { maintenanceMode: !settings.maintenanceMode },
      adminId
    );
  }

  // AUDIT LOG CRUD
  logAudit(adminId: string, action: string, targetId: string, targetType: 'user' | 'dispute' | 'verification' | 'settings', details: string): AuditLog {
    const log: AuditLog = {
      id: `audit_${Date.now()}`,
      adminId,
      action,
      targetId,
      targetType,
      details,
      timestamp: new Date().toISOString(),
    };
    
    const logs = StorageUtil.getItem<AuditLog[]>('auditLogs', []);
    logs.push(log);
    StorageUtil.setItem('auditLogs', logs);
    
    return log;
  }

  getAuditLogs(): AuditLog[] {
    return StorageUtil.getItem<AuditLog[]>('auditLogs', []);
  }

  getAuditLogsByAdmin(adminId: string): AuditLog[] {
    return this.getAuditLogs().filter(log => log.adminId === adminId);
  }

  getAuditLogsByAction(action: string): AuditLog[] {
    return this.getAuditLogs().filter(log => log.action === action);
  }

  deleteAuditLog(id: string): boolean {
    const logs = this.getAuditLogs();
    const filtered = logs.filter(log => log.id !== id);
    
    if (filtered.length === logs.length) return false;
    
    StorageUtil.setItem('auditLogs', filtered);
    return true;
  }

  // STATISTICS
  getSystemStats() {
    const users = this.getUsers();
    const logs = this.getAuditLogs();
    
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      suspendedUsers: users.filter(u => u.status === 'suspended').length,
      regularUsers: users.filter(u => u.role === 'user').length,
      tipsters: users.filter(u => u.role === 'tipster').length,
      admins: users.filter(u => u.role === 'admin').length,
      superAdmins: users.filter(u => u.role === 'super_admin').length,
      totalAuditLogs: logs.length,
      recentLogs: logs.slice(-10),
    };
  }
}

export const superAdminService = new SuperAdminService();
