import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';
import toast from 'react-hot-toast';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

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
  const { closeRegisterModal } = useModal();

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
      } else {
        toast.error(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
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

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isSubmitting}
            className="w-full bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
        </form>
      </div>
    </div>
  );
}

