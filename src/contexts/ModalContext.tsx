import React, { createContext, useContext, useState, ReactNode } from 'react';

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

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
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
    <ModalContext.Provider
      value={{
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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

