/**
 * Tipster Service - CRUD Operations
 * Handles all tipster-related operations
 */

import { StorageUtil } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export interface BettingSlip {
  id: string;
  tipsterId: string;
  tipsterName: string;
  title: string;
  description: string;
  picks: Pick[];
  totalOdds: number;
  price: number;
  league: string;
  risk: 'low' | 'medium' | 'high';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  publishedAt?: string;
  views: number;
  purchases: number;
  winRate?: number;
}

export interface Pick {
  id: string;
  match: string;
  prediction: string;
  odds: number;
  result?: 'win' | 'loss' | 'pending';
}

export interface TipsterStats {
  id: string;
  tipsterId: string;
  totalSlips: number;
  publishedSlips: number;
  totalRevenue: number;
  totalPurchases: number;
  winRate: number;
  followers: number;
  brainScore: number;
  badges: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TipsterProfile {
  id: string;
  userId: string;
  username: string;
  bio: string;
  avatar?: string;
  verified: boolean;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

class TipsterService {
  // BETTING SLIP CRUD
  createSlip(slip: Omit<BettingSlip, 'id' | 'createdAt' | 'views' | 'purchases'>): BettingSlip {
    const newSlip: BettingSlip = {
      ...slip,
      id: `slip_${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 0,
      purchases: 0,
    };
    
    const slips = StorageUtil.getItem<BettingSlip[]>(STORAGE_KEYS.CREATED_SLIPS, []);
    slips.push(newSlip);
    StorageUtil.setItem(STORAGE_KEYS.CREATED_SLIPS, slips);
    
    return newSlip;
  }

  getSlips(tipsterId?: string): BettingSlip[] {
    const slips = StorageUtil.getItem<BettingSlip[]>(STORAGE_KEYS.CREATED_SLIPS, []);
    if (tipsterId) {
      return slips.filter(s => s.tipsterId === tipsterId);
    }
    return slips;
  }

  getSlipById(id: string): BettingSlip | null {
    const slips = this.getSlips();
    return slips.find(s => s.id === id) || null;
  }

  getPublishedSlips(tipsterId?: string): BettingSlip[] {
    const slips = this.getSlips(tipsterId);
    return slips.filter(s => s.status === 'published');
  }

  getDraftSlips(tipsterId: string): BettingSlip[] {
    return this.getSlips(tipsterId).filter(s => s.status === 'draft');
  }

  updateSlip(id: string, updates: Partial<BettingSlip>): BettingSlip | null {
    const slips = this.getSlips();
    const index = slips.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    slips[index] = { ...slips[index], ...updates };
    StorageUtil.setItem(STORAGE_KEYS.CREATED_SLIPS, slips);
    
    return slips[index];
  }

  publishSlip(id: string): BettingSlip | null {
    return this.updateSlip(id, {
      status: 'published',
      publishedAt: new Date().toISOString(),
    });
  }

  archiveSlip(id: string): BettingSlip | null {
    return this.updateSlip(id, { status: 'archived' });
  }

  incrementViews(id: string): BettingSlip | null {
    const slip = this.getSlipById(id);
    if (!slip) return null;
    
    return this.updateSlip(id, { views: slip.views + 1 });
  }

  incrementPurchases(id: string): BettingSlip | null {
    const slip = this.getSlipById(id);
    if (!slip) return null;
    
    return this.updateSlip(id, { purchases: slip.purchases + 1 });
  }

  deleteSlip(id: string): boolean {
    const slips = this.getSlips();
    const filtered = slips.filter(s => s.id !== id);
    
    if (filtered.length === slips.length) return false;
    
    StorageUtil.setItem(STORAGE_KEYS.CREATED_SLIPS, filtered);
    return true;
  }

  // TIPSTER STATS CRUD
  createStats(stats: Omit<TipsterStats, 'id' | 'createdAt' | 'updatedAt'>): TipsterStats {
    const newStats: TipsterStats = {
      ...stats,
      id: `stats_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const allStats = StorageUtil.getItem<TipsterStats[]>(STORAGE_KEYS.TIPSTER_STATS, []);
    allStats.push(newStats);
    StorageUtil.setItem(STORAGE_KEYS.TIPSTER_STATS, allStats);
    
    return newStats;
  }

  getStats(tipsterId: string): TipsterStats | null {
    const allStats = StorageUtil.getItem<TipsterStats[]>(STORAGE_KEYS.TIPSTER_STATS, []);
    return allStats.find(s => s.tipsterId === tipsterId) || null;
  }

  updateStats(tipsterId: string, updates: Partial<TipsterStats>): TipsterStats | null {
    const allStats = StorageUtil.getItem<TipsterStats[]>(STORAGE_KEYS.TIPSTER_STATS, []);
    const index = allStats.findIndex(s => s.tipsterId === tipsterId);
    
    if (index === -1) return null;
    
    allStats[index] = {
      ...allStats[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    StorageUtil.setItem(STORAGE_KEYS.TIPSTER_STATS, allStats);
    
    return allStats[index];
  }

  incrementRevenue(tipsterId: string, amount: number): TipsterStats | null {
    const stats = this.getStats(tipsterId);
    if (!stats) return null;
    
    return this.updateStats(tipsterId, {
      totalRevenue: stats.totalRevenue + amount,
    });
  }

  updateWinRate(tipsterId: string, winRate: number): TipsterStats | null {
    return this.updateStats(tipsterId, { winRate });
  }

  addBadge(tipsterId: string, badge: string): TipsterStats | null {
    const stats = this.getStats(tipsterId);
    if (!stats) return null;
    
    const badges = [...(stats.badges || [])];
    if (!badges.includes(badge)) {
      badges.push(badge);
    }
    
    return this.updateStats(tipsterId, { badges });
  }

  // TIPSTER PROFILE CRUD
  createProfile(profile: Omit<TipsterProfile, 'id' | 'createdAt' | 'updatedAt'>): TipsterProfile {
    const newProfile: TipsterProfile = {
      ...profile,
      id: `profile_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const profiles = StorageUtil.getItem<TipsterProfile[]>('tipsterProfiles', []);
    profiles.push(newProfile);
    StorageUtil.setItem('tipsterProfiles', profiles);
    
    return newProfile;
  }

  getProfile(userId: string): TipsterProfile | null {
    const profiles = StorageUtil.getItem<TipsterProfile[]>('tipsterProfiles', []);
    return profiles.find(p => p.userId === userId) || null;
  }

  updateProfile(userId: string, updates: Partial<TipsterProfile>): TipsterProfile | null {
    const profiles = StorageUtil.getItem<TipsterProfile[]>('tipsterProfiles', []);
    const index = profiles.findIndex(p => p.userId === userId);
    
    if (index === -1) return null;
    
    profiles[index] = {
      ...profiles[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    StorageUtil.setItem('tipsterProfiles', profiles);
    
    return profiles[index];
  }

  followTipster(userId: string): TipsterProfile | null {
    const profile = this.getProfile(userId);
    if (!profile) return null;
    
    return this.updateProfile(userId, {
      followers: profile.followers + 1,
    });
  }

  unfollowTipster(userId: string): TipsterProfile | null {
    const profile = this.getProfile(userId);
    if (!profile || profile.followers === 0) return null;
    
    return this.updateProfile(userId, {
      followers: profile.followers - 1,
    });
  }

  deleteProfile(userId: string): boolean {
    const profiles = StorageUtil.getItem<TipsterProfile[]>('tipsterProfiles', []);
    const filtered = profiles.filter(p => p.userId !== userId);
    
    if (filtered.length === profiles.length) return false;
    
    StorageUtil.setItem('tipsterProfiles', filtered);
    return true;
  }

  // STATISTICS
  getTipsterStats(tipsterId: string) {
    const slips = this.getSlips(tipsterId);
    const stats = this.getStats(tipsterId);
    
    return {
      totalSlips: slips.length,
      publishedSlips: slips.filter(s => s.status === 'published').length,
      draftSlips: slips.filter(s => s.status === 'draft').length,
      archivedSlips: slips.filter(s => s.status === 'archived').length,
      totalViews: slips.reduce((sum, s) => sum + s.views, 0),
      totalPurchases: slips.reduce((sum, s) => sum + s.purchases, 0),
      averageOdds: slips.length > 0 
        ? slips.reduce((sum, s) => sum + s.totalOdds, 0) / slips.length 
        : 0,
      stats,
    };
  }
}

export const tipsterService = new TipsterService();
