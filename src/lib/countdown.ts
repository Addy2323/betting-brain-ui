import { useState, useEffect } from 'react';

interface TimeRemaining {
    total: number;
    hours: number;
    minutes: number;
    seconds: number;
}

/**
 * Calculate time remaining until end date
 */
export function getTimeRemaining(endTime: string): TimeRemaining {
    const total = Date.parse(endTime) - Date.now();

    if (total <= 0) {
        return { total: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    // Add days to hours for simpler display
    const totalHours = days * 24 + hours;

    return {
        total,
        hours: totalHours,
        minutes,
        seconds,
    };
}

/**
 * Format countdown as "Xh Xm Xs"
 */
export function formatCountdown(endTime: string): string {
    const time = getTimeRemaining(endTime);

    if (time.total <= 0) {
        return 'Expired';
    }

    const parts: string[] = [];

    if (time.hours > 0) {
        parts.push(`${time.hours}h`);
    }
    if (time.minutes > 0 || time.hours > 0) {
        parts.push(`${time.minutes}m`);
    }
    parts.push(`${time.seconds}s`);

    return parts.join(' ');
}

/**
 * Hook for real-time countdown updates
 */
export function useCountdown(endTime: string | undefined) {
    const [countdown, setCountdown] = useState<string>('');

    useEffect(() => {
        if (!endTime) {
            setCountdown('No timer set');
            return;
        }

        // Initial update
        setCountdown(formatCountdown(endTime));

        // Update every second
        const interval = setInterval(() => {
            const newCountdown = formatCountdown(endTime);
            setCountdown(newCountdown);

            // Stop updating if expired
            if (newCountdown === 'Expired') {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return countdown;
}
