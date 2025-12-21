interface AuthUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  banned?: boolean;
  referralCode?: string;
}

interface AuthStorage {
  user: AuthUser;
  token: string;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface RequireAuthProps {
  children: ReactElement;
}

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

interface AuthModalContextType {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  isForgotPasswordOpen: boolean;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  openForgotPasswordModal: () => void;
  closeLoginModal: () => void;
  closeRegisterModal: () => void;
  closeForgotPasswordModal: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
}