import { StorageUtil } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { RegisteredUser } from '@/context/AuthContext';

/**
 * Seed default user accounts for testing
 * Call this function to initialize test accounts in localStorage
 */
export const seedDefaultUsers = () => {
    const defaultUsers: RegisteredUser[] = [
        {
            id: 'user_1',
            email: 'user@example.com',
            password: 'password123',
            fullName: 'Regular User',
            role: 'user',
            createdAt: '2025-01-01T00:00:00.000Z',
        },
        {
            id: 'user_2',
            email: 'tipster@example.com',
            password: 'tipster123',
            fullName: 'Tipster User',
            role: 'tipster',
            createdAt: '2025-01-01T00:00:00.000Z',
        },
        {
            id: 'user_3',
            email: 'admin@bettingbrain.com',
            password: 'admin123',
            fullName: 'Admin User',
            role: 'admin',
            createdAt: '2025-01-01T00:00:00.000Z',
        },
        {
            id: 'user_4',
            email: 'superadmin@bettingbrain.com',
            password: 'superadmin123',
            fullName: 'Super Admin',
            role: 'super_admin',
            createdAt: '2025-01-01T00:00:00.000Z',
        },
    ];

    // Get existing users
    const existingUsers = StorageUtil.getItem<RegisteredUser[]>(STORAGE_KEYS.REGISTERED_USERS, []);

    // Merge with default users (avoid duplicates based on email)
    const mergedUsers = [...defaultUsers];
    existingUsers.forEach(existingUser => {
        if (!defaultUsers.find(u => u.email === existingUser.email)) {
            mergedUsers.push(existingUser);
        }
    });

    // Save to localStorage
    StorageUtil.setItem(STORAGE_KEYS.REGISTERED_USERS, mergedUsers);

    console.log('✅ Default user accounts seeded successfully!');
    console.log('📋 Available test accounts:');
    console.log('1. User: user@example.com / password123');
    console.log('2. Tipster: tipster@example.com / tipster123');
    console.log('3. Admin: admin@bettingbrain.com / admin123');
    console.log('4. Super Admin: superadmin@bettingbrain.com / superadmin123');

    return mergedUsers;
};

/**
 * Check if default users are already seeded
 */
export const areDefaultUsersSeeded = (): boolean => {
    const users = StorageUtil.getItem<RegisteredUser[]>(STORAGE_KEYS.REGISTERED_USERS, []);
    return users.some(u => u.email === 'user@example.com');
};
