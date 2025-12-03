/**
 * Bookmaker brand colors and configurations
 */

export interface BookmakerConfig {
    name: string;
    backgroundColor: string;
    textColor: string;
    displayName: string;
}

export const BOOKMAKER_CONFIGS: Record<string, BookmakerConfig> = {
    sportybet: {
        name: 'sportybet',
        backgroundColor: '#dc2626', // red-600
        textColor: '#ffffff',
        displayName: 'SportyBet',
    },
    paripesa: {
        name: 'paripesa',
        backgroundColor: '#2563eb', // blue-600
        textColor: '#ffffff',
        displayName: 'PARIPESA',
    },
    betway: {
        name: 'betway',
        backgroundColor: '#16a34a', // green-600
        textColor: '#ffffff',
        displayName: 'betway',
    },
    betika: {
        name: 'betika',
        backgroundColor: '#eab308', // yellow-500
        textColor: '#000000',
        displayName: 'Betika',
    },
    sportpesa: {
        name: 'sportpesa',
        backgroundColor: '#3b82f6', // blue-500
        textColor: '#ffffff',
        displayName: 'SportPesa',
    },
    '1xbet': {
        name: '1xbet',
        backgroundColor: '#1e40af', // blue-800
        textColor: '#ffffff',
        displayName: '1xBet',
    },
    mozzart: {
        name: 'mozzart',
        backgroundColor: '#f97316', // orange-500
        textColor: '#ffffff',
        displayName: 'Mozzart',
    },
    betin: {
        name: 'betin',
        backgroundColor: '#9333ea', // purple-600
        textColor: '#ffffff',
        displayName: 'Betin',
    },
    helabet: {
        name: 'helabet',
        backgroundColor: '#14b8a6', // teal-500
        textColor: '#ffffff',
        displayName: 'Helabet',
    },
    bet365: {
        name: 'bet365',
        backgroundColor: '#15803d', // green-700
        textColor: '#ffffff',
        displayName: 'Bet365',
    },
    betpawa: {
        name: 'betpawa',
        backgroundColor: '#0891b2', // cyan-600
        textColor: '#ffffff',
        displayName: 'Betpawa',
    },
};

/**
 * Get bookmaker configuration by name
 */
export function getBookmakerConfig(bookmakerName: string): BookmakerConfig {
    const normalized = bookmakerName.toLowerCase();
    return BOOKMAKER_CONFIGS[normalized] || {
        name: normalized,
        backgroundColor: '#6b7280', // gray-500
        textColor: '#ffffff',
        displayName: bookmakerName,
    };
}

/**
 * Get all bookmaker names
 */
export function getAllBookmakers(): string[] {
    return Object.keys(BOOKMAKER_CONFIGS);
}
