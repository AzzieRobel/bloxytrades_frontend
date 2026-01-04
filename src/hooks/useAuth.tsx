import { useContext } from "react";
import toast from "react-hot-toast";

import { GlobalContext } from "@/contexts/context";
import { authService } from "@/services";
import { getStorageKey, getToken } from "@/utils/auth";

export function useAuth() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useAuth must be used within a GlobalContextProvider');
    }
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

    const googleLogin = async () => {
        try {
            if (!(window as any).google || !(window as any).google.accounts || !(window as any).google.accounts.id) {
                toast.error('Google SDK not loaded. Please check your configuration.');
                return;
            }

            const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
            if (!clientId) {
                toast.error('Google client ID is not configured.');
                return;
            }

            setIsLoading(true);

            await new Promise<void>((resolve, reject) => {
                try {
                    (window as any).google.accounts.id.initialize({
                        client_id: clientId,
                        callback: async (response: { credential: string }) => {
                            try {
                                const { token, user } = await authService.loginWithGoogle(
                                    response.credential
                                );
                                persistAuth({ user, token });
                                toast.success(`Welcome, ${user.username || user.email}!`);
                                resolve();
                            } catch (err: any) {
                                console.error('Google login callback error:', err);
                                const message =
                                    err?.response?.data?.message || 'An error occurred during Google login.';
                                toast.error(message);
                                reject(err);
                            }
                        },
                    });

                    (window as any).google.accounts.id.prompt((notification: any) => {
                        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                            // User closed or prompt could not be displayed
                            resolve();
                        }
                    });
                } catch (err) {
                    reject(err);
                }
            });
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('Failed to login with Google. Please try again.');
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
        googleLogin,
        requestPasswordReset,
    }
}


