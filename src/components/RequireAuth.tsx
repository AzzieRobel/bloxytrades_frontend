import React, { ReactElement, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';

interface RequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { openLoginModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      openLoginModal();
      // Optionally you could track last attempted path via location.pathname
    }
  }, [isAuthenticated, isLoading, openLoginModal, location.pathname]);

  // While loading, or unauthenticated, don't render the protected page content.
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
}


