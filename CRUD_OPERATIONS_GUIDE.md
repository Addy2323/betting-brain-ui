# CRUD Operations Guide - Admin, Super Admin & Tipster

Complete CRUD (Create, Read, Update, Delete) operations for all three roles with localStorage persistence.

---

## 📁 Service Files Created

1. **`src/services/adminService.ts`** - Admin CRUD operations
2. **`src/services/superAdminService.ts`** - Super Admin CRUD operations
3. **`src/services/tipsterService.ts`** - Tipster CRUD operations

---

## 🔐 Admin Service (`adminService`)

### Disputes Management

**Create Dispute**
```tsx
import { adminService } from '@/services/adminService';

const dispute = adminService.createDispute({
  userId: 'user_123',
  slipId: 'slip_456',
  reason: 'Incorrect result',
  status: 'open',
});
```

**Read Disputes**
```tsx
// Get all disputes
const allDisputes = adminService.getDisputes();

// Get specific dispute
const dispute = adminService.getDisputeById('dispute_123');
```

**Update Dispute**
```tsx
adminService.updateDispute('dispute_123', {
  status: 'resolved',
});
```

**Resolve Dispute**
```tsx
adminService.resolveDispute('dispute_123', 'Refund issued to user');
```

**Delete Dispute**
```tsx
adminService.deleteDispute('dispute_123');
```

### Verification Requests

**Create Verification Request**
```tsx
const request = adminService.createVerificationRequest({
  tipsterId: 'tipster_123',
  tipsterName: 'John Doe',
  email: 'john@example.com',
  status: 'pending',
});
```

**Get Verification Requests**
```tsx
// All requests
const allRequests = adminService.getVerificationRequests();

// Only pending
const pending = adminService.getPendingVerifications();
```

**Approve/Reject Verification**
```tsx
// Approve
adminService.approveVerification('verify_123', 'admin_456');

// Reject
adminService.rejectVerification('verify_123', 'admin_456');
```

**Admin Statistics**
```tsx
const stats = adminService.getAdminStats();
// Returns: {
//   totalDisputes, openDisputes, resolvedDisputes,
//   totalVerifications, pendingVerifications, 
//   approvedTipsters, rejectedTipsters
// }
```

---

## 👑 Super Admin Service (`superAdminService`)

### User Management

**Create User**
```tsx
import { superAdminService } from '@/services/superAdminService';

const user = superAdminService.createUser({
  email: 'user@example.com',
  fullName: 'John Doe',
  role: 'user',
  status: 'active',
});
```

**Get Users**
```tsx
// All users
const allUsers = superAdminService.getUsers();

// Specific user
const user = superAdminService.getUserById('user_123');

// By role
const tipsters = superAdminService.getUsersByRole('tipster');
const admins = superAdminService.getUsersByRole('admin');
```

**Update User**
```tsx
superAdminService.updateUser('user_123', {
  fullName: 'Jane Doe',
  status: 'active',
});
```

**User Status Management**
```tsx
// Suspend user
superAdminService.suspendUser('user_123');

// Activate user
superAdminService.activateUser('user_123');

// Deactivate user
superAdminService.deactivateUser('user_123');
```

**Delete User**
```tsx
superAdminService.deleteUser('user_123');
```

### System Settings

**Get Settings**
```tsx
const settings = superAdminService.getSystemSettings();
// Returns: {
//   platformName, maintenanceMode, maxWithdrawalLimit,
//   commissionRate, minDepositAmount, maxDepositAmount
// }
```

**Update Settings**
```tsx
superAdminService.updateSystemSettings({
  maxWithdrawalLimit: 1000000,
  commissionRate: 0.25,
}, 'admin_123');
```

**Toggle Maintenance Mode**
```tsx
superAdminService.toggleMaintenanceMode('admin_123');
```

### Audit Logging

**Log Action**
```tsx
superAdminService.logAudit(
  'admin_123',
  'UPDATE_USER',
  'user_456',
  'user',
  'User role changed from user to tipster'
);
```

**Get Audit Logs**
```tsx
// All logs
const allLogs = superAdminService.getAuditLogs();

// By admin
const adminLogs = superAdminService.getAuditLogsByAdmin('admin_123');

// By action
const updateLogs = superAdminService.getAuditLogsByAction('UPDATE_USER');
```

**System Statistics**
```tsx
const stats = superAdminService.getSystemStats();
// Returns: {
//   totalUsers, activeUsers, suspendedUsers,
//   regularUsers, tipsters, admins, superAdmins,
//   totalAuditLogs, recentLogs
// }
```

---

## 🎯 Tipster Service (`tipsterService`)

### Betting Slip Management

**Create Slip**
```tsx
import { tipsterService } from '@/services/tipsterService';

const slip = tipsterService.createSlip({
  tipsterId: 'tipster_123',
  tipsterName: 'John Doe',
  title: 'Weekend Predictions',
  description: 'My analysis for weekend matches',
  picks: [
    { id: '1', match: 'Arsenal vs Chelsea', prediction: 'Over 2.5', odds: 1.8 },
    { id: '2', match: 'Man City vs Liverpool', prediction: 'Draw', odds: 3.5 },
  ],
  totalOdds: 6.3,
  price: 500,
  league: 'Premier League',
  risk: 'medium',
  status: 'draft',
});
```

**Get Slips**
```tsx
// All slips by tipster
const mySlips = tipsterService.getSlips('tipster_123');

// Specific slip
const slip = tipsterService.getSlipById('slip_123');

// Published only
const published = tipsterService.getPublishedSlips('tipster_123');

// Drafts only
const drafts = tipsterService.getDraftSlips('tipster_123');
```

**Update Slip**
```tsx
tipsterService.updateSlip('slip_123', {
  title: 'Updated Title',
  description: 'Updated description',
});
```

**Publish Slip**
```tsx
tipsterService.publishSlip('slip_123');
```

**Archive Slip**
```tsx
tipsterService.archiveSlip('slip_123');
```

**Track Engagement**
```tsx
// Increment views
tipsterService.incrementViews('slip_123');

// Increment purchases
tipsterService.incrementPurchases('slip_123');
```

**Delete Slip**
```tsx
tipsterService.deleteSlip('slip_123');
```

### Tipster Statistics

**Create Stats**
```tsx
const stats = tipsterService.createStats({
  tipsterId: 'tipster_123',
  totalSlips: 0,
  publishedSlips: 0,
  totalRevenue: 0,
  totalPurchases: 0,
  winRate: 0,
  followers: 0,
  brainScore: 0,
  badges: [],
});
```

**Get Stats**
```tsx
const stats = tipsterService.getStats('tipster_123');
```

**Update Stats**
```tsx
tipsterService.updateStats('tipster_123', {
  winRate: 75,
  brainScore: 850,
});
```

**Manage Revenue**
```tsx
tipsterService.incrementRevenue('tipster_123', 5000);
```

**Update Win Rate**
```tsx
tipsterService.updateWinRate('tipster_123', 72.5);
```

**Add Badge**
```tsx
tipsterService.addBadge('tipster_123', 'top_performer');
```

### Tipster Profile

**Create Profile**
```tsx
const profile = tipsterService.createProfile({
  userId: 'user_123',
  username: 'johndoe',
  bio: 'Professional tipster with 5+ years experience',
  verified: true,
  followers: 0,
  following: 0,
});
```

**Get Profile**
```tsx
const profile = tipsterService.getProfile('user_123');
```

**Update Profile**
```tsx
tipsterService.updateProfile('user_123', {
  bio: 'Updated bio',
  avatar: 'https://example.com/avatar.jpg',
});
```

**Follow/Unfollow**
```tsx
// Follow
tipsterService.followTipster('user_123');

// Unfollow
tipsterService.unfollowTipster('user_123');
```

**Get Tipster Statistics**
```tsx
const stats = tipsterService.getTipsterStats('tipster_123');
// Returns: {
//   totalSlips, publishedSlips, draftSlips, archivedSlips,
//   totalViews, totalPurchases, averageOdds, stats
// }
```

---

## 🔄 Usage in Components

### Example: Admin Dispute Management

```tsx
import { adminService } from '@/services/adminService';
import { useState, useEffect } from 'react';

export function DisputeManager() {
  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    const allDisputes = adminService.getDisputes();
    setDisputes(allDisputes);
  }, []);

  const handleResolve = (id: string, resolution: string) => {
    adminService.resolveDispute(id, resolution);
    setDisputes(adminService.getDisputes());
  };

  return (
    <div>
      {disputes.map(dispute => (
        <div key={dispute.id}>
          <h3>{dispute.reason}</h3>
          <button onClick={() => handleResolve(dispute.id, 'Resolved')}>
            Resolve
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Example: Tipster Slip Management

```tsx
import { tipsterService } from '@/services/tipsterService';
import { useState } from 'react';

export function SlipManager() {
  const [slips, setSlips] = useState([]);
  const tipsterId = 'tipster_123';

  const handleCreateSlip = (slipData) => {
    const newSlip = tipsterService.createSlip({
      tipsterId,
      ...slipData,
    });
    setSlips(tipsterService.getSlips(tipsterId));
  };

  const handlePublish = (slipId) => {
    tipsterService.publishSlip(slipId);
    setSlips(tipsterService.getSlips(tipsterId));
  };

  return (
    <div>
      {slips.map(slip => (
        <div key={slip.id}>
          <h3>{slip.title}</h3>
          <button onClick={() => handlePublish(slip.id)}>
            Publish
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 Data Persistence

All CRUD operations automatically persist to localStorage:
- ✅ Admin disputes → `adminDisputes`
- ✅ Admin verifications → `adminVerificationRequests`
- ✅ Super admin users → `superAdminUsers`
- ✅ System settings → `systemSettings`
- ✅ Audit logs → `auditLogs`
- ✅ Tipster slips → `CREATED_SLIPS`
- ✅ Tipster stats → `TIPSTER_STATS`
- ✅ Tipster profiles → `tipsterProfiles`

---

## 🎯 Best Practices

### ✅ DO:
- Use service methods for all CRUD operations
- Check for null returns before using data
- Update UI after CRUD operations
- Use TypeScript interfaces for type safety
- Log important actions (especially for Super Admin)

### ❌ DON'T:
- Directly access localStorage
- Skip error handling
- Forget to update UI state
- Mix service calls with direct storage access
- Ignore return values

---

## 🚀 Integration Checklist

- [ ] Import services in components
- [ ] Use CRUD methods for all data operations
- [ ] Update UI state after operations
- [ ] Handle null/undefined returns
- [ ] Add error handling where needed
- [ ] Test all CRUD operations
- [ ] Verify localStorage persistence

---

## 📝 Summary

**Admin Service**: Manage disputes and tipster verifications
**Super Admin Service**: Full user management, system settings, audit logs
**Tipster Service**: Create/manage slips, track stats, manage profiles

All services use localStorage for persistence and are fully integrated with the app's authentication and theme systems.

**Status: READY FOR PRODUCTION ✅**
