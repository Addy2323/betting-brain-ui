// Subscription storage utilities

export interface Subscription {
    tipsterId: string;
    tipsterName: string;
    plan: 'daily' | 'weekly' | 'monthly';
    price: number;
    startDate: string;
    endDate: string;
}

export interface PendingSubscription {
    tipsterId: string;
    tipsterName: string;
    tipsterImage: string;
    plan: 'daily' | 'weekly' | 'monthly';
    price: number;
}

const SUBSCRIPTION_KEY = 'userSubscriptions';
const PENDING_SUBSCRIPTION_KEY = 'pendingSubscription';

export const subscriptionUtils = {
    // Get all user subscriptions
    getSubscriptions: (): Subscription[] => {
        const data = localStorage.getItem(SUBSCRIPTION_KEY);
        return data ? JSON.parse(data) : [];
    },

    // Add a new subscription
    addSubscription: (subscription: Subscription): void => {
        const subscriptions = subscriptionUtils.getSubscriptions();
        // Remove old subscription to same tipster if exists
        const filtered = subscriptions.filter(s => s.tipsterId !== subscription.tipsterId);
        filtered.push(subscription);
        localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(filtered));
    },

    // Check if user is subscribed to a tipster
    isSubscribed: (tipsterId: string): boolean => {
        const subscriptions = subscriptionUtils.getSubscriptions();
        const subscription = subscriptions.find(s => s.tipsterId === tipsterId);

        if (!subscription) return false;

        const now = new Date();
        const endDate = new Date(subscription.endDate);
        return now <= endDate;
    },

    // Get active subscription for a tipster
    getSubscription: (tipsterId: string): Subscription | null => {
        const subscriptions = subscriptionUtils.getSubscriptions();
        const subscription = subscriptions.find(s => s.tipsterId === tipsterId);

        if (!subscription) return null;

        const now = new Date();
        const endDate = new Date(subscription.endDate);
        return now <= endDate ? subscription : null;
    },

    // Remove expired subscriptions
    cleanupExpired: (): void => {
        const subscriptions = subscriptionUtils.getSubscriptions();
        const now = new Date();
        const active = subscriptions.filter(s => new Date(s.endDate) > now);
        localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(active));
    },

    // Calculate end date based on plan
    calculateEndDate: (plan: 'daily' | 'weekly' | 'monthly'): Date => {
        const now = new Date();
        switch (plan) {
            case 'daily':
                return new Date(now.getTime() + 24 * 60 * 60 * 1000);
            case 'weekly':
                return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            case 'monthly':
                return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        }
    },

    // Get price for plan
    getPlanPrice: (plan: 'daily' | 'weekly' | 'monthly'): number => {
        switch (plan) {
            case 'daily':
                return 3000;
            case 'weekly':
                return 7000;
            case 'monthly':
                return 20000;
        }
    },

    // Pending subscription management
    setPendingSubscription: (pending: PendingSubscription): void => {
        localStorage.setItem(PENDING_SUBSCRIPTION_KEY, JSON.stringify(pending));
    },

    getPendingSubscription: (): PendingSubscription | null => {
        const data = localStorage.getItem(PENDING_SUBSCRIPTION_KEY);
        return data ? JSON.parse(data) : null;
    },

    clearPendingSubscription: (): void => {
        localStorage.removeItem(PENDING_SUBSCRIPTION_KEY);
    },

    // Activate pending subscription after payment
    activatePendingSubscription: (): boolean => {
        const pending = subscriptionUtils.getPendingSubscription();
        if (!pending) return false;

        const subscription: Subscription = {
            tipsterId: pending.tipsterId,
            tipsterName: pending.tipsterName,
            plan: pending.plan,
            price: pending.price,
            startDate: new Date().toISOString(),
            endDate: subscriptionUtils.calculateEndDate(pending.plan).toISOString(),
        };

        subscriptionUtils.addSubscription(subscription);
        subscriptionUtils.clearPendingSubscription();
        return true;
    },
};
