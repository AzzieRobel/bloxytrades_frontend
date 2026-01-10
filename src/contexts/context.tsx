import { createContext, useEffect, useState } from 'react'

import { config } from '@/config';

const { storageKey } = config;

export const GlobalContext = createContext<any | undefined>(undefined)

const user: UserState = {
    id: "",
    username: "",
    email: "",
    isBanned: false,
    referralCode: "",
    createdAt: "",
};

const sellerProfile: SellerProfile = {
    userId: "",
    isEnabled: false,
    isPremium: false,
    rating: 0,
    completedOrder: 0,
    failedOrders: 0,
    disputedCounts: 0,
    suspendedUntil: false,
};

const initialState: InitialState = {
    user,
    listings: [],
    sellerProfile,
    isLoading: false,
}

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(true);

    const update = (data: Partial<InitialState>) => {
        setState(prev => ({ ...prev, ...data }))
    }

    // Load auth state from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(storageKey);

            if (stored) {
                const parsed: AuthStorage = JSON.parse(stored);
                // Safety check: ensure parsed.user exists and has required fields
                if (parsed?.user && parsed.user.id) {
                    update({
                        user: {
                            id: parsed.user.id,
                            username: parsed.user.username,
                            email: parsed.user.email,
                            isBanned: parsed.user.banned || false,
                            createdAt: parsed.user.createdAt,
                            referralCode: parsed.user.referralCode || "",
                        }
                    });
                } else {
                    // Invalid data in localStorage, clear it
                    localStorage.removeItem(storageKey);
                }
            }
        } catch (error) {
            console.error('Failed to load auth from localStorage:', error);
            // Clear corrupted data
            try {
                localStorage.removeItem(storageKey);
            } catch (e) {
                // Ignore errors when clearing
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <GlobalContext.Provider value={{
            state,
            update,
            isLoading,
            setIsLoading,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}