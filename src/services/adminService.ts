/**
 * Admin Service - CRUD Operations
 * Handles all admin-related operations
 */

import { StorageUtil } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'admin';
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface Dispute {
  id: string;
  userId: string;
  slipId: string;
  reason: string;
  status: 'open' | 'resolved' | 'rejected';
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface VerificationRequest {
  id: string;
  tipsterId: string;
  tipsterName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

class AdminService {
  // DISPUTES CRUD
  createDispute(dispute: Omit<Dispute, 'id' | 'createdAt'>): Dispute {
    const newDispute: Dispute = {
      ...dispute,
      id: `dispute_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const disputes = StorageUtil.getItem<Dispute[]>('adminDisputes', []);
    disputes.push(newDispute);
    StorageUtil.setItem('adminDisputes', disputes);
    
    return newDispute;
  }

  getDisputes(): Dispute[] {
    return StorageUtil.getItem<Dispute[]>('adminDisputes', []);
  }

  getDisputeById(id: string): Dispute | null {
    const disputes = this.getDisputes();
    return disputes.find(d => d.id === id) || null;
  }

  updateDispute(id: string, updates: Partial<Dispute>): Dispute | null {
    const disputes = this.getDisputes();
    const index = disputes.findIndex(d => d.id === id);
    
    if (index === -1) return null;
    
    disputes[index] = { ...disputes[index], ...updates };
    StorageUtil.setItem('adminDisputes', disputes);
    
    return disputes[index];
  }

  resolveDispute(id: string, resolution: string): Dispute | null {
    return this.updateDispute(id, {
      status: 'resolved',
      resolution,
      resolvedAt: new Date().toISOString(),
    });
  }

  deleteDispute(id: string): boolean {
    const disputes = this.getDisputes();
    const filtered = disputes.filter(d => d.id !== id);
    
    if (filtered.length === disputes.length) return false;
    
    StorageUtil.setItem('adminDisputes', filtered);
    return true;
  }

  // VERIFICATION REQUESTS CRUD
  createVerificationRequest(request: Omit<VerificationRequest, 'id' | 'submittedAt'>): VerificationRequest {
    const newRequest: VerificationRequest = {
      ...request,
      id: `verify_${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    
    const requests = StorageUtil.getItem<VerificationRequest[]>('adminVerificationRequests', []);
    requests.push(newRequest);
    StorageUtil.setItem('adminVerificationRequests', requests);
    
    return newRequest;
  }

  getVerificationRequests(): VerificationRequest[] {
    return StorageUtil.getItem<VerificationRequest[]>('adminVerificationRequests', []);
  }

  getPendingVerifications(): VerificationRequest[] {
    return this.getVerificationRequests().filter(r => r.status === 'pending');
  }

  approveVerification(id: string, adminId: string): VerificationRequest | null {
    return this.updateVerificationRequest(id, {
      status: 'approved',
      reviewedAt: new Date().toISOString(),
      reviewedBy: adminId,
    });
  }

  rejectVerification(id: string, adminId: string): VerificationRequest | null {
    return this.updateVerificationRequest(id, {
      status: 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewedBy: adminId,
    });
  }

  updateVerificationRequest(id: string, updates: Partial<VerificationRequest>): VerificationRequest | null {
    const requests = this.getVerificationRequests();
    const index = requests.findIndex(r => r.id === id);
    
    if (index === -1) return null;
    
    requests[index] = { ...requests[index], ...updates };
    StorageUtil.setItem('adminVerificationRequests', requests);
    
    return requests[index];
  }

  deleteVerificationRequest(id: string): boolean {
    const requests = this.getVerificationRequests();
    const filtered = requests.filter(r => r.id !== id);
    
    if (filtered.length === requests.length) return false;
    
    StorageUtil.setItem('adminVerificationRequests', filtered);
    return true;
  }

  // STATISTICS
  getAdminStats() {
    const disputes = this.getDisputes();
    const verifications = this.getVerificationRequests();
    
    return {
      totalDisputes: disputes.length,
      openDisputes: disputes.filter(d => d.status === 'open').length,
      resolvedDisputes: disputes.filter(d => d.status === 'resolved').length,
      totalVerifications: verifications.length,
      pendingVerifications: verifications.filter(v => v.status === 'pending').length,
      approvedTipsters: verifications.filter(v => v.status === 'approved').length,
      rejectedTipsters: verifications.filter(v => v.status === 'rejected').length,
    };
  }
}

export const adminService = new AdminService();
