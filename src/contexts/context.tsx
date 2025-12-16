import { createContext, useEffect, useState } from 'react'

import { config } from '@/config';

const { storageKey } = config;

export const GlobalContext = createContext<any | undefined>(undefined)

const user: UserState = {
    id: "",
    username: "",
    email: "",
    banned: false,
    createdAt: "",
    referralCode: "",
}

const initialState: InitialState = {
    user: user,
}

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(true);

    // Modal state
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    // Complete update function to support deep updates for "user" object
    const update = (data: Partial<InitialState>) => {
        setState(prev => ({ ...prev, ...data }))
    }

    // Modal functions
    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsRegisterModalOpen(false);
        setIsForgotPasswordOpen(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        setIsLoginModalOpen(false);
        setIsForgotPasswordOpen(false);
    };

    const openForgotPasswordModal = () => {
        setIsForgotPasswordOpen(true);
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    const closeForgotPasswordModal = () => {
        setIsForgotPasswordOpen(false);
    };

    const switchToRegister = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
        setIsForgotPasswordOpen(false);
    };

    const switchToLogin = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(true);
        setIsForgotPasswordOpen(false);
    };

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
                            banned: parsed.user.banned || false,
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
            openLoginModal,
            openRegisterModal,
            openForgotPasswordModal,
            closeLoginModal,
            closeRegisterModal,
            closeForgotPasswordModal,
            isLoginModalOpen,
            isRegisterModalOpen,
            isForgotPasswordOpen,
            switchToRegister,
            switchToLogin,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}