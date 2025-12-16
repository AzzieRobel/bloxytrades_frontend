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