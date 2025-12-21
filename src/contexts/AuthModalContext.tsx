import { createContext, useContext, useState, ReactNode } from 'react';

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

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

    return (
        <AuthModalContext.Provider
            value={{
                isLoginModalOpen,
                isRegisterModalOpen,
                isForgotPasswordOpen,
                openLoginModal,
                openRegisterModal,
                openForgotPasswordModal,
                closeLoginModal,
                closeRegisterModal,
                closeForgotPasswordModal,
                switchToRegister,
                switchToLogin,
            }}
        >
            {children}
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const context = useContext(AuthModalContext);
    if (!context)
        throw new Error('useAuthModal must be used within an AuthModalProvider');
    return context;
}

