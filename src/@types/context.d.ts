interface GlobalContextType {
    state: InitialState
    update: (data: any) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
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

interface InitialState {
    user: UserState | null,
}

interface UserState {
    id: string
    username: string
    email: string
    isBanned: boolean
    referralCode: string
    createdAt: string
}