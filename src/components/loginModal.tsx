import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAuthModal } from '../hooks/useAuthModal';
import toast from 'react-hot-toast';

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const { login, googleLogin } = useAuth();
  const { closeLoginModal, openForgotPasswordModal } = useAuthModal();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await login(formData.emailOrUsername, formData.password);

      if (result.success) {
        setFormData({ emailOrUsername: '', password: '' });
        closeLoginModal();
        onClose();
      }
      // Error toast is already shown in the hook
    } catch (error) {
      // Error toast is already shown in the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin();
      closeLoginModal();
      onClose();
    } catch (error) {
      // Error is already handled in the context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1a1a1a] rounded-lg w-full max-w-md shadow-2xl px-5">
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={onSwitchToRegister}
            className="flex-1 py-4 px-6 text-gray-400 text-center font-medium transition-colors hover:text-white"
          >
            Register
          </button>
          <button
            className="flex-1 py-4 px-6 text-white text-center font-medium border-b-2 border-white relative"
          >
            Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Email or Username */}
          <div>
            <label className="block text-white text-left text-sm font-medium mb-2">
              Email or Username<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Email or Username"
              value={formData.emailOrUsername}
              onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-left font-medium mb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              required
            />
            <div className='flex justify-end mt-1'>
              <button
                type="button"
                onClick={() => {
                  closeLoginModal();
                  onClose();
                  openForgotPasswordModal();
                }}
                className="text-blue-500 text-sm hover:text-blue-400 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-lg shadow-primary/25"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          {/* Separator */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <span className="relative bg-[#1a1a1a] px-4 text-gray-400 text-sm">
              or continue with
            </span>
          </div>

          {/* Google Button - default style */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-medium py-3 px-4 rounded-md border border-gray-300 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 10.8v3.6h5.08c-.22 1.3-.9 2.4-1.9 3.14l3.07 2.38c1.8-1.66 2.85-4.1 2.85-7.02 0-.68-.06-1.34-.18-1.98H12z" />
              <path fill="#34A853" d="M6.56 14.32l-.87.66-2.45 1.9C4.94 19.93 8.2 22 12 22c2.7 0 4.96-.9 6.61-2.44l-3.07-2.38c-.85.56-1.94.9-3.54.9-2.72 0-5.02-1.84-5.84-4.36z" />
              <path fill="#4A90E2" d="M3.24 7.12A9.96 9.96 0 0 0 2 12c0 1.57.36 3.05 1 4.38l3.56-2.76a5.94 5.94 0 0 1 0-3.24L3.24 7.12z" />
              <path fill="#FBBC05" d="M12 5.1c1.48 0 2.8.52 3.85 1.54l2.89-2.89C16.96 1.5 14.7.5 12 .5 8.2.5 4.94 2.57 3.24 5.88l3.56 2.76C6.98 6.94 9.28 5.1 12 5.1z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}

