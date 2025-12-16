interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; message?: string }>;
    register: (username: string, email: string, password: string, referralCode?: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    googleLogin: () => Promise<void>;
    requestPasswordReset: (emailOrUsername: string) => Promise<{ success: boolean; message?: string }>;
}

interface ModalContextType {
    openLoginModal: () => void;
    openRegisterModal: () => void;
    openForgotPasswordModal: () => void;
    closeLoginModal: () => void;
    closeRegisterModal: () => void;
    closeForgotPasswordModal: () => void;
    isLoginModalOpen: boolean;
    isRegisterModalOpen: boolean;
    isForgotPasswordOpen: boolean;
    switchToRegister: () => void;
    switchToLogin: () => void;
}