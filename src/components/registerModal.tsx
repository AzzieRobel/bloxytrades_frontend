import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAuthModal } from '../hooks/useAuthModal';
import toast from 'react-hot-toast';

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    referralCode: '',
    agreeToTerms: false,
  });
  const { register, googleLogin } = useAuth();
  const { closeRegisterModal } = useAuthModal();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the Terms and Conditions');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.referralCode || undefined
      );

      if (result.success) {
        setFormData({
          username: '',
          email: '',
          password: '',
          referralCode: '',
          agreeToTerms: false,
        });
        closeRegisterModal();
        onClose();
      }
      // Error toast is already shown in the hook
    } catch (error) {
      // Error toast is already shown in the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin();
      closeRegisterModal();
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
      <div className="relative bg-[#1a1a1a] rounded-md w-full max-w-md shadow-2xl px-5">
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            className="flex-1 py-4 px-6 text-white text-center font-medium border-b-2 border-white relative"
          >
            Register
          </button>
          <button
            onClick={onSwitchToLogin}
            className="flex-1 py-4 px-6 text-gray-400 text-center font-medium transition-colors hover:text-white"
          >
            Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-white text-left text-sm font-medium mb-2">
              Username<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white text-left text-sm font-medium mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-left text-sm font-medium mb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 pr-12 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              className="w-4 h-4 text-primary bg-[#0f0f0f] border-white/10 rounded focus:ring-primary focus:ring-offset-0"
            />
            <label htmlFor="agreeToTerms" className="text-gray-300 text-sm">
              I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </label>
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-white text-left text-sm font-medium mb-2">
              Referral Code <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Enter Code"
              value={formData.referralCode}
              onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-lg shadow-primary/25"
          >
            {isSubmitting ? 'Creating account...' : 'Register'}
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
            onClick={handleGoogleRegister}
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

