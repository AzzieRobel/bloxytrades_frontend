import { config } from "@/config";

const { storageKey } = config;

export const getToken = (): string | null => {
    try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            const parsed: AuthStorage = JSON.parse(stored);
            return parsed.token || null;
        }
    } catch (error) {
        console.error('Failed to get token from localStorage:', error);
    }
    return null;
};

export const getStorageKey = (): string => {
    return storageKey;
};

