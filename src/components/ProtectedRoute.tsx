import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAuthModal } from '@/hooks/useAuthModal';
import { getToken } from '@/utils/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const { openLoginModal } = useAuthModal();
    const location = useLocation();

    // PRIMARY CHECK: Check token first (synchronous, before any navigation)
    const token = getToken();
    const hasToken = !!token;

    // Wait for context to finish loading before making navigation decisions
    if (isLoading) {
        return null; // Show nothing while loading auth state
    }

    // If no token exists, open modal and redirect to homepage
    if (!hasToken) {
        // Store the attempted path
        sessionStorage.setItem('redirectedFromProtectedRoute', location.pathname);
        // Open login modal immediately (before redirect)
        openLoginModal();
        // Redirect to homepage
        return <Navigate to="/" replace state={{ from: location.pathname }} />;
    }

    // If token exists but user is not authenticated (invalid/expired token)
    if (!isAuthenticated) {
        // Store the attempted path
        sessionStorage.setItem('redirectedFromProtectedRoute', location.pathname);
        // Open login modal
        openLoginModal();
        // Redirect to homepage
        return <Navigate to="/" replace state={{ from: location.pathname }} />;
    }

    // User has valid token and is authenticated - allow access
    return <>{children}</>;
}

