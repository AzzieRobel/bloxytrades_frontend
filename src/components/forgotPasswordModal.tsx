import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAuthModal } from '../hooks/useAuthModal';
import toast from 'react-hot-toast';

export function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }: ForgotPasswordModalProps) {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { requestPasswordReset } = useAuth();
    const { closeForgotPasswordModal, openLoginModal } = useAuthModal();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const result = await requestPasswordReset(emailOrUsername);
            if (result.success) {
                setEmailOrUsername('');
                closeForgotPasswordModal();
                onClose();
            } else {
                toast.error(result.message || 'Unable to send reset link.');
            }
        } catch {
            toast.error('Unexpected error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackToLogin = () => {
        closeForgotPasswordModal();
        openLoginModal();
        onSwitchToLogin?.();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-[#1a1a1a] rounded-lg w-full max-w-md shadow-2xl px-5">

                <div className="flex border-b border-white/10">
                    <button className="flex-1 py-4 px-6 text-white text-center font-medium border-b-2 border-white relative">
                        Forgot Password
                    </button>
                    <button
                        onClick={handleBackToLogin}
                        className="flex-1 py-4 px-6 text-gray-400 text-center font-medium transition-colors hover:text-white"
                    >
                        Back to Login
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-white text-left text-sm font-medium mb-2">
                            Email or Username<span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Enter your email or username"
                                value={emailOrUsername}
                                onChange={(e) => setEmailOrUsername(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-lg shadow-primary/25"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <p className="text-gray-400 text-sm text-center">
                        We will send a reset link to your email. (Mocked for demo)
                    </p>
                </form>
            </div>
        </div>
    );
}