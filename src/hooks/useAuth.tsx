import { useContext } from "react";
import toast from "react-hot-toast";

import { GlobalContext } from "@/contexts/context";
import { authService } from "@/services";
import { getStorageKey, getToken } from "@/utils/auth";

export function useAuth() {
    const context = useContext(GlobalContext);

    const { state, update, setIsLoading, isLoading } = context;

    const persistAuth = (data: any) => {
        const { user, token } = data
        const payload: AuthStorage = { user, token };
        localStorage.setItem(getStorageKey(), JSON.stringify(payload));
        update({ user })
    }

    const login = async (emailOrUsername: string, password: string) => {
        try {
            setIsLoading(true);
            const { token, user } = await authService.login(emailOrUsername, password);
            persistAuth({ user, token });
            toast.success(`Welcome back, ${user.username || user.email}!`);
            return { success: true };
        } catch (error: any) {
            console.error('Login error:', error);
            const message = error?.response?.data?.message || error?.message || 'An error occurred during login.';
            toast.error(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    }

    const register = async (username: string, email: string, password: string, _referralCode?: string) => {
        try {
            setIsLoading(true);
            const { token, user } = await authService.register(username, email, password);
            persistAuth({ user, token });
            toast.success(`Account created successfully!`);
            return { success: true };
        } catch (error: any) {
            console.error('Registration error:', error);
            const message = error?.response?.data?.message || error?.message || 'An error occurred during registration.';
            toast.error(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem(getStorageKey());
        update({ user: null })
        toast.success('Logged out successfully!');
    }

    // Still a mock for now; you can wire to backend when ready.
    const requestPasswordReset = async (_emailOrUsername: string) => {
        toast.success('Password reset link sent (mock). Check your email.');
        return { success: true };
    }

    const googleAuth = async () => {
        setIsLoading(true);

        try {
            await authService.googleAuth();
        } catch (error: any) {
            console.error('Google auth error:', error);
            toast.error(error.response?.data?.message || error.message || 'Google login failed');
        } finally {
            setIsLoading(false);
        }
    }

    const googleLogin = async (code: string) => {
        try {
            setIsLoading(true);
            const response = await authService.googleLogin(code);
            
            if (response.token && response.user) {
                persistAuth({ user: response.user, token: response.token });
                toast.success(`Welcome, ${response.user.username || response.user.email}!`);
                return { success: true, user: response.user };
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            console.error('Google login error:', error);
            const message = error?.response?.data?.message || error?.message || 'Google login failed';
            toast.error(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    }

    const token = getToken();

    return {
        user: state.user,
        token,
        isAuthenticated: !!state.user && !!token,
        isLoading,
        login,
        register,
        logout,
        googleAuth,
        googleLogin,
        requestPasswordReset,
    }
}
